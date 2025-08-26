/* eslint-disable */
import styled from '@emotion/styled'
import { MenuItem, MenuItemProps } from '@mui/material'
import Menu from '@mui/material/Menu'
import * as React from 'react'

interface Props {
	trigger: JSX.Element
	menu: JSX.Element[]
	keepOpen?: boolean
	isOpen?: boolean
	onOpen?: (param?: any) => void
	minWidth?: string
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
					anchorEl={isOpen}
					open={!!isOpen}
					onClose={handleClose}
					sx={theme => ({
						'& .MuiPaper-root': {
							borderRadius: '4px',
							marginTop: '8px',
							width: '240px',
							maxHeight: '352px',
							boxShadow: '0px 2px 6px 2px #00000026',
							color: theme.palette.surface_emphasis.high,
						},
						'& .MuiList-root': {
							background: theme.palette.elevation_overlay['08dp'],
						},
						'& .Mui-selected': {
							backgroundColor: `${theme.palette.surface_states.selected} !important`,
						},
						'& .MuiMenuItem-root': {
							padding: '16px 12px',
							'&:hover': {
								backgroundColor: theme.palette.surface_states.hover,
							},
						},
					})}
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
	gap: 12px;

	& > svg {
		width: 24px;
		height: 24px;
	}
`

export const DropdownMenuItem = (props: MenuItemProps) => (
	<StyledDropdownMenuItem {...props} />
)
