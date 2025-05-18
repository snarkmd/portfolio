import { MenuProvider } from "./MenuProvider";
import { NavAllowedProvider } from "./NavAllowedProvider";
import { SoundProvider } from "./soundProvider";
const AppProvider = ({ children }) => {
  return (
    <SoundProvider>
      <MenuProvider>
        <NavAllowedProvider>{children}</NavAllowedProvider>
      </MenuProvider>
    </SoundProvider>
  );
};

export default AppProvider;
