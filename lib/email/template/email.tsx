import { APP_TITLE } from "@/lib/constants";
import {
  Html,
  Button,
  Head,
  Preview,
  Container,
  Body,
  Text,
  Section,
} from "@react-email/components";

export interface EmailVerificationProps {
  code: string;
}

export function EmailVerification({ code }: EmailVerificationProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>
        Verify your email address to complete your {APP_TITLE} registration.
      </Preview>
      <Body>
        <Container>
          <Section>
            <Text>{APP_TITLE}</Text>
            <Text>Hi there! I'm Azhar Rahadian</Text>
            <Text>
              Thank you for registering for an account on {APP_TITLE}. To
              complete your registration, please verify your your account by
              using the following code:
            </Text>
            <Text>{code}</Text>
            <Text>
              If you have any questions, please don't hesitate to contact us at
              support@{APP_TITLE.toLowerCase()}.com.
            </Text>
          </Section>
        </Container>
      </Body>
      <Button>Click me</Button>
    </Html>
  );
}
