/* eslint-disable */
import styled from "@emotion/styled";
import Menu from "@mui/material/Menu";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import * as React from "react";
// import NestedMenuItem, { NestedMenuItemProps } from "./NestedMenuItem";

interface Props {
  trigger: JSX.Element;
  menu: JSX.Element[];
  keepOpen?: boolean;
  isOpen?: boolean;
  onOpen?: (param?: any) => void;
  minWidth?: string;
}
export const Dropdown = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      trigger,
      menu,
      keepOpen: keepOpenGlobal,
      isOpen: controlledIsOpen,
      onOpen: onControlledOpen,
      minWidth,
    },
    ref
  ) => {
    const [isInternalOpen, setInternalOpen] = React.useState(null);

    const isOpen = controlledIsOpen || isInternalOpen;

    let anchorRef = React.useRef(ref);

    // if (ref) {
    //   anchorRef = ref;
    // }

    const handleOpen = (event: any) => {
      event.stopPropagation();

      if (menu.length) {
        onControlledOpen
          ? onControlledOpen(event.currentTarget)
          : setInternalOpen(event.currentTarget);
      }
    };

    const handleClose = (event: any) => {
      event.stopPropagation();

      if (
        anchorRef.current &&
        (anchorRef.current as any).contains(event.target)
      ) {
        return;
      }

      handleForceClose();
    };

    const handleForceClose = () => {
      onControlledOpen ? onControlledOpen(null) : setInternalOpen(null);
    };

    const renderMenu: any = (menuItem: any, index: any) => {
      const { keepOpen: keepOpenLocal, ...props } = menuItem.props;

      let extraProps = {};
      if (props.menu) {
        extraProps = {
          parentMenuOpen: isOpen,
        };
      }

      return React.createElement(menuItem.type, {
        ...props,
        key: index,
        ...extraProps,
        onClick: (event: any) => {
          event.stopPropagation();

          if (!keepOpenGlobal && !keepOpenLocal) {
            handleClose(event);
          }

          if (menuItem.props.onClick) {
            menuItem.props.onClick(event);
          }
        },
        children: props.menu
          ? React.Children.map(props.menu, renderMenu)
          : props.children,
      });
    };

    return (
      <>
        {React.cloneElement(trigger, {
          onClick: isOpen ? handleForceClose : handleOpen,
          ref: anchorRef,
        })}

        <Menu
          PaperProps={{ sx: { minWidth: minWidth ?? 0 } }}
          anchorEl={isOpen as any}
          open={!!isOpen}
          onClose={handleClose}
          sx={(theme) => ({
            "& .MuiPaper-root": {
              border: `1px solid ${theme.palette.secondary_shades[400]}`,
              borderRadius: "8px",
            },
            "& .MuiSvgIcon-root": {
              fill: theme.palette.secondary_shades[500],
              color: theme.palette.secondary_shades[500],
              width: "16px",
              height: "16px",
              minWidth: "24px",
            },
            "& .MuiDivider-root": {
              borderColor: theme.palette.secondary_shades[400],
              margin: "0 !important",
            },
            "& .MuiButtonBase-root": {
              fontSize: "12px",
              // "& :first-child": {
              //   borderBottom: "1px solid red",
              // },
            },
            // "& .MuiButtonBase-root:first-child": {
            //   borderBottom: "1px solid red",
            // },
            "& .MuiMenuItem-root": {
              padding: "16px",
              "&:hover": {
                "& .MuiSvgIcon-root ": {
                  fill: theme.palette.primary.main,

                  color: theme.palette.primary.main,
                },
              },
            },
            "& .MuiList-root": {
              padding: 0,
              ">:first-child": {
                borderBottom: `0.5px solid ${theme.palette.secondary_shades[400]}`,
                "&:hover": {
                  borderBottom: `0.5px solid ${theme.palette.primary.main}`,
                  background: theme.palette.mix_shades[200],
                },
              },
              ">:first-child:hover + li": {
                borderTop: `0.5px solid ${theme.palette.primary.main}`,
              },
              ">:not(:first-child):not(:last-child)": {
                borderTop: `0.5px solid ${theme.palette.secondary_shades[400]}`,
                borderBottom: `0.5px solid ${theme.palette.secondary_shades[400]}`,
                "&:hover": {
                  borderTop: `0.5px solid ${theme.palette.primary.main}`,
                  borderBottom: `0.5px solid ${theme.palette.primary.main}`,
                  background: theme.palette.mix_shades[200],
                },
              },
              ">:last-child": {
                borderTop: `0.5px solid ${theme.palette.secondary_shades[400]}`,
                "&:hover": {
                  borderTop: `0.5px solid ${theme.palette.primary.main}`,
                  background: theme.palette.mix_shades[200],
                },
              },
            },
          })}
        >
          {React.Children.map(menu, renderMenu)}
        </Menu>
      </>
    );
  }
);

const StyledDropdownMenuItem = styled(MenuItem)`
  display: flex;
  justify-content: flex-start !important;
  & > svg {
    margin-left: 32px;
  }
`;

export const DropdownMenuItem = (props: MenuItemProps) => (
  <StyledDropdownMenuItem {...props} />
);
