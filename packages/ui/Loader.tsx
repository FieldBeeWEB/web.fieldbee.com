import styled from "@emotion/styled";

interface LoaderProps {
  size?: number;
  margin?: string;
}

const StyledLoader = styled.div<LoaderProps>`
  border: 4px solid #ffd833;
  border-top: 4px solid transparent;
  border-radius: 50%;
  width: ${(props) => (props.size ? `${props.size}px` : "60px")};
  height: ${(props) => (props.size ? `${props.size}px` : "60px")};
  animation: spin 2s linear infinite;
  margin: ${(props) => (props.margin ? `${props.margin}` : "")};
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Loader = ({ size = 60, margin = "" }: LoaderProps) => (
  <StyledLoader size={size} margin={margin} />
);
