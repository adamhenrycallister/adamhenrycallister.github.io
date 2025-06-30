import React from "react";
import "./ContactIcons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGoogleScholar } from "@fortawesome/free-brands-svg-icons";

const ContactIcons = () => {
  return (
    <div className="contact-icons">
      <a href="mailto:adam.callister@yale.edu" aria-label="Email">
        <FontAwesomeIcon icon={faEnvelope} />
      </a>
      <a href="https://www.linkedin.com/in/adamhenrycallister/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
      <a href="https://scholar.google.com/citations?user=uUr-yUgAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" aria-label="Google Scholar">
        <FontAwesomeIcon icon={faGoogleScholar} />
      </a>
      <a href="https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=6987965" target="_blank" rel="noopener noreferrer" aria-label="SSRN">
        <img src="/ssrn.svg" alt="SSRN" />
      </a>
    </div>
  );
};

export default ContactIcons;
