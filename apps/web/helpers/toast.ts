import CheckIcon from "@fieldbee/ui/custom-icons/CheckIcon";
import { ToastContent, toast as toaster } from "react-toastify";

export const toast = {
  success: (content: ToastContent, toastId?: string) =>
    toaster.success(content, { toastId, icon: CheckIcon }),
  error: (content: ToastContent, toastId?: string) =>
    toaster.error(content, { toastId }),
  info: (content: ToastContent, toastId?: string) =>
    toaster.info(content, { toastId }),
};
