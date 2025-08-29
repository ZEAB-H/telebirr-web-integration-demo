const baseUrl = "http://localhost:3000";


declare global {
  interface Window {
    handleinitDataCallback?: () => void;
    consumerapp?: {
      evaluate: (obj: string) => void;
    };
  }
}

export const priceList = [10, 20, 50, 100, 200, 500, 1000];

export type StartPayState = {
  selectedIndex: number | null;
  loading: boolean;
  error: string | null;
};

export function createStartPayState(): StartPayState {
  return {
    selectedIndex: null,
    loading: false,
    error: null,
  };
}

export function selectProduct(
  state: StartPayState,
  setState: (s: StartPayState) => void,
  itemIndex: number
) {
  setState({
    ...state,
    selectedIndex: itemIndex,
    error: null,
  });
}

export async function startPay(
  state: StartPayState,
  setState: (s: StartPayState) => void
) {
  if (state.selectedIndex === null) {
    setState({ ...state, error: "Please select a product." });
    return;
  }

  setState({ ...state, loading: true, error: null });

  window.handleinitDataCallback = function () {
    window.location.href = window.location.origin;
  };

  try {
    const res = await fetch(baseUrl + "/create/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "diamond_" + priceList[state.selectedIndex],
        amount: priceList[state.selectedIndex] + "",
      }),
    });

    const rawRequest = await res.text();
    if (!rawRequest) {
      setState({ ...state, loading: false, error: "No response from server." });
      return;
    }

    const obj = JSON.stringify({
      functionName: "js_fun_start_pay",
      params: {
        rawRequest: rawRequest.trim(),
        functionCallBackName: "handleinitDataCallback",
      },
    });

    if (
      typeof window.consumerapp === "undefined" ||
      window.consumerapp === null
    ) {
      setState({ ...state, loading: false, error: "This is not opened in app!" });
      return;
    }
    window.consumerapp.evaluate(obj);
    setState({ ...state, loading: false, error: null });
  } catch (err: any) {
    setState({
      ...state,
      loading: false,
      error: "Error occurred: " + (err?.message || String(err)),
    });
  }
}
