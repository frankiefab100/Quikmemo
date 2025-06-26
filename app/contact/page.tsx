import { Metadata } from "next";
import ComingSoonSection from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Contact Quikmemo | We're Here to Help",
  description:
    "Have questions or need support? Reach out to the Quikmemo team. We're committed to providing you with the best note-taking experience.",
};

const ContactPage: React.FC = () => {
  return <ComingSoonSection />;
};

export default ContactPage;
