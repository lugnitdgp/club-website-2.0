import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 rounded-tl-[25xl] py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Contact Section */}
          <div>
            <h3 className="font-bold text-lg">Contact</h3>
            <p className="mt-2">📍 NIT Durgapur, West Bengal, India 713209</p>
            <p>📧 <a href="mailto:contact@nitdgplug.org" className="text-blue-500 hover:underline">contact@nitdgplug.org</a></p>
            <p>📞 <a href="tel:+919679670516" className="text-blue-500 hover:underline">+91 9679670516</a></p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="font-bold text-lg">Resources</h3>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="text-blue-500 hover:underline">Blog</a></li>
              <li><a href="#" className="text-blue-500 hover:underline">Projects</a></li>
              <li><a href="#" className="text-blue-500 hover:underline">Tutorials</a></li>
              <li><a href="#" className="text-blue-500 hover:underline">Events</a></li>
            </ul>
          </div>

          {/* Community & Play Store */}
          <div className="flex flex-col items-start">
            <h3 className="font-bold text-lg">Community</h3>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="text-blue-500 hover:underline">Discord</a></li>
              <li><a href="#" className="text-blue-500 hover:underline">Mailing List</a></li>
              <li><a href="#" className="text-blue-500 hover:underline">Code of Conduct</a></li>
              <li><a href="#" className="text-blue-500 hover:underline">Contributors</a></li>
            </ul>

            {/* Google Play Button */}
            <a href="https://play.google.com/store" className="mt-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Get it on Google Play" 
                className="w-40"
              />
            </a>
          </div>
          
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>© 2025 GLUG NIT Durgapur. All rights reserved.</p>
          <p>
            <a href="#" className="hover:underline">Privacy Policy</a> |
            <a href="#" className="hover:underline"> Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
