/* eslint-disable react/display-name */
import ArrowRight from "@mui/icons-material/ArrowRight";
import Menu from "@mui/material/Menu";
import MenuItem, { MenuItemProps as MProps } from "@mui/material/MenuItem";
import * as React from "react";

type NestedMenuItemProps = {
  leftIcon?: JSX.Element;
  label: string;
  menu: JSX.Element[];
} & MProps;

const DropdownNestedMenuItem = React.forwardRef<MProps, NestedMenuItemProps>(
  (props, ref) => {
    const {
      parentMenuOpen,
      label,
      leftIcon,
      rightIcon = <ArrowRight style={{ fontSize: 16 }} />,
      keepOpen,
      children,
      // customTheme,
      className,
      tabIndex: tabIndexProp,
      ContainerProps: ContainerPropsProp = {},
      rightAnchored,
      ...MenuItemProps
    }: any = props;

    const { ref: containerRefProp, ...ContainerProps } = ContainerPropsProp;

    const menuItemRef = React.useRef(null);
    React.useImperativeHandle(ref, () => (menuItemRef as any).current);

    const containerRef = React.useRef(null);
    React.useImperativeHandle(containerRefProp, () => containerRef.current);

    const menuContainerRef = React.useRef(null);

    const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false);

    const handleMouseEnter = (event: any) => {
      setIsSubMenuOpen(true);

      if (ContainerProps?.onMouseEnter) {
        ContainerProps.onMouseEnter(event);
      }
    };

    const handleMouseLeave = (event: any) => {
      setIsSubMenuOpen(false);

      if (ContainerProps?.onMouseLeave) {
        ContainerProps.onMouseLeave(event);
      }
    };

    const isSubmenuFocused = () => {
      const active = (containerRef as any).current?.ownerDocument
        ?.activeElement;

      for (const child of (menuContainerRef as any).current?.children ?? []) {
        if (child === active) {
          return true;
        }
      }
      return false;
    };

    const handleFocus = (event: any) => {
      if (event.target === (containerRef as any).current) {
        setIsSubMenuOpen(true);
      }

      if (ContainerProps?.onFocus) {
        ContainerProps.onFocus(event);
      }
    };

    const handleKeyDown = (event: any) => {
      if (event.key === "Escape") {
        return;
      }

      if (isSubmenuFocused()) {
        event.stopPropagation();
      }

      const active = (containerRef as any).current?.ownerDocument
        ?.activeElement;

      if (event.key === "ArrowLeft" && isSubmenuFocused()) {
        (containerRef as any).current?.focus();
      }

      if (
        event.key === "ArrowRight" &&
        event.target === containerRef.current &&
        event.target === active
      ) {
        const firstChild = (menuContainerRef as any).current?.children[0];
        firstChild?.focus();
      }
    };

    const open = isSubMenuOpen && parentMenuOpen;

    let tabIndex;
    if (!props.disabled) {
      tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
    }

    return (
      <div
        {...ContainerProps}
        style={{
          display: "flex",
          justifyContent: "flex-start !important",
          "& > svg": {
            marginLeft: "32px",
          },
        }}
        ref={containerRef}
        onFocus={handleFocus}
        tabIndex={tabIndex}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
      >
        <MenuItem
          {...MenuItemProps}
          data-open={!!open || undefined}
          className={className}
          ref={menuItemRef}
          keepOpen={keepOpen}
          sx={{ width: "100%" }}
        >
          {leftIcon}
          {label}
          <div style={{ flexGrow: 1, flex: 1 }} />
          {rightIcon}
        </MenuItem>
        <Menu
          sx={(theme) => ({
            "& .MuiButtonBase-root": {
              fontSize: "12px",
            },
            "& .MuiMenuItem-root": {
              padding: "16px",
              "& .MuiSvgIcon-root &:hover": {
                fill: theme.palette.primary.main,
              },
            },
            "& .MuiPaper-root": {
              border: `1px solid ${theme.palette.secondary_shades[400]}`,
              borderRadius: "8px",
            },
            "& .MuiList-root": {
              padding: 0,
              ">div": {
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
            },
          })}
          hideBackdrop
          style={{ pointerEvents: "none" }}
          anchorEl={menuItemRef.current}
          anchorOrigin={{
            vertical: "top",
            horizontal: rightAnchored ? "left" : "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: rightAnchored ? "right" : "left",
          }}
          // css={customTheme as any}
          open={!!open}
          autoFocus={false}
          disableAutoFocus
          disableEnforceFocus
          onClose={() => {
            setIsSubMenuOpen(false);
          }}
        >
          <div ref={menuContainerRef} style={{ pointerEvents: "auto" }}>
            {children}
          </div>
        </Menu>
      </div>
    );
  }
);

export default DropdownNestedMenuItem;
