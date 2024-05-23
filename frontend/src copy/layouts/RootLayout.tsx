import { NavLink, Outlet } from "react-router-dom";
import { Heading, Section, TabNav } from "@radix-ui/themes";

export default function RootLayout() {
  return (
    <>
      <Heading>Speed Typing App</Heading>
      <TabNav.Root>
        <TabNav.Link asChild>
          <NavLink to="/">Home</NavLink>
        </TabNav.Link>
        <TabNav.Link asChild>
          <NavLink to="/Login">Login</NavLink>
        </TabNav.Link>
        <TabNav.Link asChild>
          <NavLink to="/Dashboard">Dashboard</NavLink>
        </TabNav.Link>
      </TabNav.Root>
      <Section>
        <Outlet />
      </Section>
    </>
  );
}
