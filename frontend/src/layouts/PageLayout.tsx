import { ReactNode } from "react";
import { Container, Typography, AppBar, Toolbar, Box } from "@mui/material";

type PageLayoutProps = {
  children: ReactNode;
  title: string;
};

// export default function PageLayout({ children, title }: PageLayoutProps) {
//   return (
//     <Container>
//       <AppBar position="static" color="secondary">
//         <Toolbar>
//           <Typography variant="h4" gutterBottom>
//             {title}
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       {children}
//     </Container>
//   );
// }

export default function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <Container maxWidth={"md"}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {children}
      </Box>
    </Container>
  );
}
