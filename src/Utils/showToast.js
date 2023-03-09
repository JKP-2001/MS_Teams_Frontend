import React from "react";
import toast from "react-hot-toast";

import * as Sentry from "@sentry/react";

const validatedType = (type) => {
  const types = ["success", "error", "loading", "custom", "promise"];
  return types.includes(type);
};

const CustomMsg = (t, { msg, includeDismiss }) => {
  return (
    <div className="flex justify-center items-center">
      <span>
        <p className="mt-1 text-sm text-gray-500">{msg}</p>
      </span>
      {includeDismiss && (
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      )}
    </div>
  );
};

const showToast = ({
  msg = "Empty Message",
  type = "success",
  duration = 2000,
  position = "top-center",
  includeDismiss = false,
}) =>
  validatedType(type)
    ? toast[type]((t) => CustomMsg(t, { msg, includeDismiss }), {
        duration: duration,
        position: position,
        ...(includeDismiss && { icon: null }),
      })
    : toast(msg);

export const showError = (err) => {
  console.log(err);
  showToast({
    type: "error",
    msg: err.response?.data?.msg || "Something went wrong !!",
    duration: 1000,
  });
  if (!err.response.status || err.response.status == 500) {
    Sentry.captureException(err);
  }
};
export default showToast;