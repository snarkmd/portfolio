import { MenuProvider } from "./MenuProvider";
import { PreloaderProvider } from "./PreloaderContext";
import { SoundProvider } from "./soundProvider";

// Task 2: mounted PreloaderProvider so preloader completion state is shared through React context.
// Task 3: removed NavAllowedProvider because its only consumer is not mounted anywhere in the app.
const AppProvider = ({ children }) => {
  return (
    <PreloaderProvider>
      <SoundProvider>
        <MenuProvider>{children}</MenuProvider>
      </SoundProvider>
    </PreloaderProvider>
  );
};

export default AppProvider;
