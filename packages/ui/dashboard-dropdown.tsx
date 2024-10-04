/* eslint-disable */
import Menu from "@mui/material/Menu";
import * as React from "react";

interface Props {
  trigger: JSX.Element;
  menu: JSX.Element[];
  keepOpen?: boolean;
  isOpen?: boolean;
  onOpen?: (param?: any) => void;
  minWidth?: string;
}

export const DashboardDropdown = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      trigger,
      menu,
      keepOpen: keepOpenGlobal,
      isOpen: controlledIsOpen,
      onOpen: onControlledOpen,
      minWidth,
    },
    ref,
  ) => {
    const [isInternalOpen, setInternalOpen] = React.useState(null);
    const isOpen = controlledIsOpen || isInternalOpen;
    let anchorRef = React.useRef(ref);

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
              borderRadius: "4px",
              marginTop: "8px",
              width: "200px",
              maxHeight: "352px",
              boxShadow: "0px 2px 6px 2px #00000026",
            },
            "& .MuiList-root": {
              background: theme.palette.secondary_shades[300],
            },
            "& .Mui-selected": {
              backgroundColor: `${theme.palette.secondary_shades[400]} !important`,
            },
            "& .MuiMenuItem-root": {
              padding: "16px 12px",
              "&:hover": {
                backgroundColor: theme.palette.secondary_shades[400],
              },
            },
          })}
        >
          {React.Children.map(menu, renderMenu)}
        </Menu>
      </>
    );
  },
);
