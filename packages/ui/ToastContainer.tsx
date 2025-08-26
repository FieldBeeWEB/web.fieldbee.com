import styled from "@emotion/styled";
import {
  ToastContainer as BaseToastContainer,
  ToastContainerProps,
} from "react-toastify";
import { theme } from "./ThemeProvider";

const TOAST = `Toastify__toast`;
const TOAST_BODY = `${TOAST}-body`;
const TOAST_ICON = `${TOAST}-icon`;
const TOAST_INFO = `${TOAST}--info`;
const TOAST_SUCCESS = `${TOAST}--success`;
const TOAST_WARNING = `${TOAST}--warning`;
const TOAST_ERROR = `${TOAST}--error`;

const StyledToast = styled(BaseToastContainer)`
  // .${TOAST} {
  //   color: ${theme.palette.surface_emphasis.high};
  //   font-size: 14px;
  //   font-weight: 400;
  //   line-height: 20px;
  //   letter-spacing: 0.25px;
  //   border-radius: 24px;
  //   border: 1px solid ${theme.palette.outline.main};
  //   background: ${theme.palette.surface.main};
  //   box-shadow:
  //     0px 2px 4px 0px rgba(0, 0, 0, 0.2),
  //     0px 1px 10px 0px rgba(0, 0, 0, 0.12),
  //     0px 4px 5px 0px rgba(0, 0, 0, 0.14);
  //   padding: 6px 16px;
  //   gap: 8px;
  //   min-height: 50px;
  //
  //   .${TOAST_BODY} {
  //     padding: 0;
  //     color: #fff;
  //     min-height: 36px;
  //   }
  // }
  //
  // .${TOAST_SUCCESS} {
  //   .${TOAST_ICON} {
  //     margin-right: 8px;
  //
  //     .MuiSvgIcon-root {
  //       background-color: ${theme.palette.primary.main};
  //     }
  //
  //     & > svg {
  //       fill: ${theme.palette.primary.main};
  //     }
  //   }
  // }
`;

const ToastContainer = ({ ...props }: ToastContainerProps) => (
  <StyledToast {...props} />
);

export default ToastContainer;
