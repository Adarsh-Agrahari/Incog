// emails/VerificationEmails.ts
const VerificationEmail = ({ username, otp }: { username: string; otp: string }): string => `
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
      </Head>
      <Section>
        <Row>
          <Heading as="h2">Hello ${username},</Heading>
        </Row>
        <Row>
          <p>Thank you for registering.</p> 
          <p>Your verification code is: <strong>${otp}</strong></p>
          <p>Please use this code to verify your email address.</p>
        </Row>
        <Row>
          <Text>
            If you did not request this code, please ignore this email.
          </Text>
        </Row>
        <Row>
        </Row>
      </Section>
    </Html>
`;

export default VerificationEmail;
