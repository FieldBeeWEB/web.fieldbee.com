import { ContentWrapper } from '@fieldbee/ui'

import { useRouter } from 'next/router'
import * as React from 'react'
import { pagePaths } from '../config/page-paths'
import { getUserToken } from '../helpers/user-token'

export default function AuthedLayout({ children }: React.PropsWithChildren) {
	const router = useRouter()

	React.useEffect(() => {
		const token = getUserToken()
		if (!token) {
			router.push(pagePaths.publicPages.login)
		}
	}, [router])

	// const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	// const open = Boolean(anchorEl)
	// const handleClick = (event: React.MouseEvent<HTMLElement>) => {
	// 	setAnchorEl(event.currentTarget)
	// }
	// const handleClose = () => {
	// 	setAnchorEl(null)
	// }

	// const [openSettings, setOpenSettings] = React.useState(false)
	// const handleOpenSettings = () => setOpenSettings(true)
	// const handleCloseSettings = () => setOpenSettings(false)

	return (
		// <DashboardLayout>
		//   <Sidebar>
		//     <NavButton
		//       onClick={() => {
		//         router.push(pagePaths.authPages.home);
		//       }}
		//     >
		//       <Image src="/logo.svg" alt="FieldBee" width={48} height={48} />
		//     </NavButton>
		//     <Stack>
		//       {MenuList.map(({ path, title, icon: Icon }, index) => (
		//         <NavButton
		//           key={index}
		//           startIcon={<Icon />}
		//           onClick={() => {
		//             router.push(path);
		//           }}
		//           active={router.pathname === path}
		//         >
		//           {title}
		//         </NavButton>
		//       ))}
		//     </Stack>
		//     <Stack>
		//       <Typography variant="caption" textAlign={"center"}>
		//         PoC v3.0
		//       </Typography>
		//       <NavButton
		//         startIcon={<AccountOutlinedIcon />}
		//         onClick={handleClick}
		//         aria-controls={open ? "account-menu" : undefined}
		//         aria-haspopup="true"
		//         aria-expanded={open ? "true" : undefined}
		//       >
		//         {t(SingleWordsTranslationKeys.Account)}
		//       </NavButton>
		//       <SmallMenu
		//         anchorEl={anchorEl}
		//         id="account-menu"
		//         open={open}
		//         onClose={handleClose}
		//         onClick={handleClose}
		//       >
		//         <MenuItem
		//           onClick={() => {
		//             router.push(pagePaths.logout);
		//           }}
		//         >
		//           <ListItemIcon>
		//             <Logout fontSize="small" />
		//           </ListItemIcon>
		//           {t(SingleWordsTranslationKeys.Logout)}
		//         </MenuItem>
		//         {/*<Divider />*/}
		//         <MenuItem onClick={handleOpenSettings}>
		//           <ListItemIcon>
		//             <AccountCircleOutlined fontSize="small" />
		//           </ListItemIcon>
		//           {t(PhrasesTranslationKeys.EditProfile)}
		//         </MenuItem>
		//       </SmallMenu>
		//     </Stack>
		//   </Sidebar>
		<ContentWrapper>{children}</ContentWrapper>
		// <Settings open={openSettings} handleClose={handleCloseSettings} />
		// </DashboardLayout>
	)
}
