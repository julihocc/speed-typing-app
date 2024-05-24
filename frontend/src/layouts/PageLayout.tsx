import { ReactNode } from "react";
import { Container, Typography } from "@mui/material";

type PageLayoutProps = {
  children: ReactNode;
  title: string;
};

export default function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>
      {children}
    </Container>
  );
}
