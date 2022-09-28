export const API_END_POINT = "https://mwu.roto-frontend.programmers.co.kr";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "Jocharito",
      },
    });

    if (res.ok) {
      return res.json();
    }

    throw new Error(`API 호출 오류`);
  } catch (e) {
    alert(e.message);
  }
};
