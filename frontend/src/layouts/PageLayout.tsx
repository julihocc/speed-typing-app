import { ReactNode } from "react";
import { Container, Typography, AppBar, Toolbar } from "@mui/material";

type PageLayoutProps = {
  children: ReactNode;
  title: string;
};

export default function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <Container>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
    </Container>
  );
}
