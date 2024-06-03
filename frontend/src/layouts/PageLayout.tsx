import { ReactNode } from "react";
import { Container, Typography, AppBar, Toolbar, Box } from "@mui/material";

type PageLayoutProps = {
  children: ReactNode;
  title: string;
};

export default function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <Container maxWidth={"md"}>
      <AppBar position="static" color="secondary" sx={{ mb: 4 }}>
        <Toolbar>
          <Box
            sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            p={2}
          >
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
