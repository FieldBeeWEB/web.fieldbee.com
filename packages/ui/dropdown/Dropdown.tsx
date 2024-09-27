/* eslint-disable */
import styled from '@emotion/styled'
import { SxProps, Theme } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import * as React from 'react'
// import NestedMenuItem, { NestedMenuItemProps } from "./NestedMenuItem";

interface Props {
	trigger: JSX.Element
	menu: JSX.Element[]
	type?: 'dashboard' | 'regular'
	keepOpen?: boolean
	isOpen?: boolean
	onOpen?: (param?: any) => void
	minWidth?: string
	customStyle?: SxProps<Theme>
}
export const Dropdown = React.forwardRef<HTMLButtonElement, Props>(
	(
		{
			trigger,
			menu,
			type = 'regular',
			keepOpen: keepOpenGlobal,
			isOpen: controlledIsOpen,
			onOpen: onControlledOpen,
			minWidth,
			customStyle,
		},
		ref
	) => {
		const [isInternalOpen, setInternalOpen] = React.useState(null)
		const isOpen = controlledIsOpen || isInternalOpen
		let anchorRef = React.useRef(ref)

		const handleOpen = (event: any) => {
			event.stopPropagation()

			if (menu.length) {
				onControlledOpen
					? onControlledOpen(event.currentTarget)
					: setInternalOpen(event.currentTarget)
			}
		}

		const handleClose = (event: any) => {
			event.stopPropagation()

			if (
				anchorRef.current &&
				(anchorRef.current as any).contains(event.target)
			) {
				return
			}

			handleForceClose()
		}

		const handleForceClose = () => {
			onControlledOpen ? onControlledOpen(null) : setInternalOpen(null)
		}

		const renderMenu: any = (menuItem: any, index: any) => {
			const { keepOpen: keepOpenLocal, ...props } = menuItem.props

			let extraProps = {}
			if (props.menu) {
				extraProps = {
					parentMenuOpen: isOpen,
				}
			}

			return React.createElement(menuItem.type, {
				...props,
				key: index,
				...extraProps,
				onClick: (event: any) => {
					event.stopPropagation()

					if (!keepOpenGlobal && !keepOpenLocal) {
						handleClose(event)
					}

					if (menuItem.props.onClick) {
						menuItem.props.onClick(event)
					}
				},
				children: props.menu
					? React.Children.map(props.menu, renderMenu)
					: props.children,
			})
		}

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
					sx={theme =>
						type === 'regular'
							? {
									'& .MuiPaper-root': {
										border: `1px solid ${theme.palette.secondary_shades[400]}`,
										borderRadius: '8px',
									},
									'& .MuiSvgIcon-root': {
										fill: theme.palette.secondary_shades[500],
										color: theme.palette.secondary_shades[500],
										width: '16px',
										height: '16px',
										minWidth: '24px',
									},
									'& .MuiDivider-root': {
										borderColor: theme.palette.secondary_shades[400],
										margin: '0 !important',
									},
									'& .MuiButtonBase-root': {
										fontSize: '12px',
									},
									'& .MuiMenuItem-root': {
										padding: '16px',
										'&:hover': {
											'& .MuiSvgIcon-root ': {
												fill: theme.palette.primary.main,
												color: theme.palette.primary.main,
											},
										},
									},
									'& .MuiList-root': {
										padding: 0,
										'>:first-child': {
											borderBottom: `0.5px solid ${theme.palette.secondary_shades[400]}`,
											'&:hover': {
												borderBottom: `0.5px solid ${theme.palette.primary.main}`,
												background: theme.palette.mix_shades[200],
											},
										},
										'>:first-child:hover + li': {
											borderTop: `0.5px solid ${theme.palette.primary.main}`,
										},
										'>:not(:first-child):not(:last-child)': {
											borderTop: `0.5px solid ${theme.palette.secondary_shades[400]}`,
											borderBottom: `0.5px solid ${theme.palette.secondary_shades[400]}`,
											'&:hover': {
												borderTop: `0.5px solid ${theme.palette.primary.main}`,
												borderBottom: `0.5px solid ${theme.palette.primary.main}`,
												background: theme.palette.mix_shades[200],
											},
										},
										'>:last-child': {
											borderTop: `0.5px solid ${theme.palette.secondary_shades[400]}`,
											'&:hover': {
												borderTop: `0.5px solid ${theme.palette.primary.main}`,
												background: theme.palette.mix_shades[200],
											},
										},
									},
							  }
							: type === 'dashboard'
							? {
									'& .MuiPaper-root': {
										borderRadius: '4px',
										marginTop: '8px',
										width: '200px',
										maxHeight: '352px',
										boxShadow: '0px 2px 6px 2px #00000026',
									},
									'& .MuiList-root': {
										background: theme.palette.secondary_shades[300],
									},
									'& .Mui-selected': {
										backgroundColor: `${theme.palette.secondary_shades[400]} !important`,
									},
									'& .MuiMenuItem-root': {
										padding: '16px 12px',
										'&:hover': {
											backgroundColor: theme.palette.secondary_shades[400],
										},
									},
							  }
							: { customStyle }
					}
				>
					{React.Children.map(menu, renderMenu)}
				</Menu>
			</>
		)
	}
)

const StyledDropdownMenuItem = styled(MenuItem)`
	display: flex;
	justify-content: flex-start !important;
	& > svg {
		margin-left: 32px;
	}
`

export const DropdownMenuItem = (props: MenuItemProps) => (
	<StyledDropdownMenuItem {...props} />
)
