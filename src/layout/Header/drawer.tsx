import { Drawer } from "antd";

const DrawerComp = (props: any) => {
  const { onClose, open, placement, width, children, ...rest } = props;
  return (
    <Drawer  placement={placement} width={width} onClose={onClose} open={open} closable={true} {...rest}>
      {children}
    </Drawer>
  );
};

export default DrawerComp;
