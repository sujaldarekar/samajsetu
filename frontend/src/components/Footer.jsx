/**
 * Footer Component
 * Shown at bottom of every page
 */

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-3">🌉 SAMAJSETU</h3>
            <p className="text-sm text-light leading-relaxed">
              A digital bridge between citizens and government for efficient complaint management and social service resolution.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-3">Quick Links</h3>
            <ul className="text-sm text-light space-y-2">
              <li>
                <a href="#" className="hover:text-white transition">
                  📖 About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  📞 Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  🔒 Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  ⚖️ Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-3">Contact & Support</h3>
            <p className="text-sm text-light space-y-2">
              <div>📧 support@samajsetu.gov</div>
              <div>📞 1800-COMPLAINTS</div>
              <div>🕒 Available 24/7</div>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="text-light hover:text-white transition">
              Facebook
            </a>
            <a href="#" className="text-light hover:text-white transition">
              Twitter
            </a>
            <a href="#" className="text-light hover:text-white transition">
              LinkedIn
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-light">
            <p>
              © 2026 SAMAJSETU • Digital India Initiative<br />
              <span className="text-xs">
                Built with ❤️ for Better Governance
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
