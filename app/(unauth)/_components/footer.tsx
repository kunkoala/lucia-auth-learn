import { IconCopyright } from "@tabler/icons-react";

const githubUrl = "https://github.com/iamtouha/next-lucia-auth";
const twitterUrl = "https://twitter.com/iamtouha";

export const Footer = () => {
  return (
    <footer className="mt-6 px-4 py-6">
      <div className="container flex items-center p-0">
        <IconCopyright className="mr-2 h-6 w-6" />
        <p className="text-sm">Azhar Rahadian</p>
      </div>
    </footer>
  );
};
