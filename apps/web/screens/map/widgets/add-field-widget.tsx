import { Button, SmallMenu } from "@fieldbee/ui";
import { ListItemIcon, MenuItem } from "@fieldbee/ui/components";
import { Add, TabUnselected, Upload } from "@fieldbee/ui/icons";
import { useRouter } from "next/router";
import * as React from "react";
import { pagePaths } from "../../../config/page-paths";
import ImportFieldsModal from "../../import-fields/import-fields-modal";

enum PlusButtonActionKeys {
  IMPORT_FIELDS = "import-fields",
  DRAW_FIELD = "draw-field",
}

const actions = [
  {
    icon: <Upload />,
    name: "Import fields",
    key: PlusButtonActionKeys.IMPORT_FIELDS,
  },
  {
    icon: <TabUnselected />,
    name: "Draw field",
    key: PlusButtonActionKeys.DRAW_FIELD,
  },
];
const AddFieldWidget = () => {
  const router = useRouter();

  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <Button onClick={handleClick} startIcon={<Add />}>
        Add field
      </Button>
      <SmallMenu
        sx={{
          transform: "translateX(0) translateY(-80px)",
        }}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        {actions.map((action, key) => (
          <MenuItem
            key={action.name}
            onClick={() => {
              if (action.key !== PlusButtonActionKeys.IMPORT_FIELDS) {
                router.push(pagePaths.authPages.addField);
              } else {
                handleOpenModal();
              }
            }}
          >
            <ListItemIcon>{action.icon}</ListItemIcon>
            {action.name}
          </MenuItem>
        ))}
      </SmallMenu>
      <ImportFieldsModal openModal={openModal} handleClose={handleCloseModal} />
    </>
  );
};
export default AddFieldWidget;
