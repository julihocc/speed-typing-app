import { ReactNode } from "react";
import { Container, Typography, AppBar, Toolbar, Box } from "@mui/material";

type PageLayoutProps = {
  children: ReactNode;
  title: string;
};

export default function PageTemplate({ children, title }: PageLayoutProps) {
  return (
    <Container maxWidth={"md"}>
      <AppBar position="static" color="secondary" className="mb-4">
        <Toolbar>
          <Box className="flex-grow flex justify-center p-2">
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box className="flex flex-col items-center">{children}</Box>
    </Container>
  );
}
