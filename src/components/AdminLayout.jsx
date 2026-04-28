// import { useState } from 'react'; // 1. Added useState
// import { useNavigate, Link, Outlet } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { 
//   LayoutDashboard, 
//   ClipboardList, 
//   Settings, 
//   LogOut, 
//   Shirt,
//   Users,
//   Menu, // 2. Added Menu
//   X     // 3. Added X
// } from 'lucide-react';

// const AdminLayout = () => {
//   const { logout, user } = useAuth();
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 4. Mobile State

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const menuItems = [
//     { name: 'Overview', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
//     { name: 'Orders', icon: <ClipboardList size={20} />, path: '/dashboard/orders' },
//     { name: 'Services', icon: <Shirt size={20} />, path: '/dashboard/services' },
//     { name: 'Staff', icon: <Users size={20} />, path: '/dashboard/staff' },
//   ];

//   // Reusable Sidebar Content to avoid repetition
//   const SidebarContent = () => (
//     <>
//       <div className="p-6 flex items-center justify-between border-b border-white/10">
//         <div className="flex items-center gap-3">
//           <div className="p-2 bg-brand-teal rounded-lg">
//             <Shirt size={24} />
//           </div>
//           <span className="font-bold text-xl tracking-tight">Mufti Spot</span>
//         </div>
//         {/* Close button - only visible on mobile */}
//         <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-white/60 hover:text-white">
//           <X size={24} />
//         </button>
//       </div>

//       <nav className="flex-1 p-4 space-y-2 mt-4">
//         {menuItems.map((item) => (
//           <Link
//             key={item.name}
//             to={item.path}
//             onClick={() => setIsMobileMenuOpen(false)} // Close sidebar on link click
//             className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
//           >
//             {item.icon}
//             <span className="font-medium">{item.name}</span>
//           </Link>
//         ))}
//       </nav>

//       <div className="p-4 border-t border-white/10">
//         <button 
//           onClick={handleLogout}
//           className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
//         >
//           <LogOut size={20} />
//           <span className="font-medium">Sign Out</span>
//         </button>
//       </div>
//     </>
//   );

//   return (
//     <div className="flex min-h-screen bg-slate-50 relative">
      
//       {/* 5. MOBILE SIDEBAR OVERLAY */}
//       {isMobileMenuOpen && (
//         <div 
//           className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-[100] md:hidden"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}

//       {/* 6. MOBILE SIDEBAR (Drawer) */}
//       <aside className={`
//         fixed inset-y-0 left-0 w-64 bg-brand-navy text-white z-[101] transform transition-transform duration-300 ease-in-out md:hidden
//         ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
//       `}>
//         <SidebarContent />
//       </aside>

//       {/* 7. DESKTOP SIDEBAR (Normal) */}
//       <aside className="w-64 bg-brand-navy text-white hidden md:flex flex-col">
//         <SidebarContent />
//       </aside>

//       {/* Main Content Area */}
//       <main className="flex-1 flex flex-col min-w-0">
//         {/* Topbar */}
//         <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8">
//           <div className="flex items-center gap-4">
//             {/* 8. HAMBURGER BUTTON */}
//             <button 
//               onClick={() => setIsMobileMenuOpen(true)}
//               className="p-2 md:hidden text-slate-600 hover:bg-slate-100 rounded-lg"
//             >
//               <Menu size={24} />
//             </button>
//             <h2 className="font-semibold text-slate-700 uppercase tracking-wider text-xs md:text-sm">
//               Admin <span className="hidden sm:inline">Management</span>
//             </h2>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="text-right hidden sm:block">
//               <p className="text-sm font-bold text-brand-navy leading-none">{user?.name}</p>
//               <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
//             </div>
//             <div className="w-10 h-10 bg-brand-teal/10 text-brand-teal rounded-full flex items-center justify-center font-bold border border-brand-teal/20">
//               {user?.name?.charAt(0)}
//             </div>
//           </div>
//         </header>

//         <div className="p-4 md:p-8 overflow-y-auto">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminLayout;

import { useState } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { 
  LayoutDashboard, 
  ClipboardList, 
  LogOut, 
  Shirt,
  Users,
  Menu, 
  X 
} from 'lucide-react';

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. The actual logout logic after confirmation
  const executeLogout = () => {
    toast.success("Signing out...", { 
      icon: '🚀',
      style: {
        background: '#0f172a',
        color: '#fff',
        fontSize: '11px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      }
    });

    setTimeout(() => {
      logout();
      navigate('/login');
    }, 1200);
  };

  // 2. The Confirmation Toast
  const handleLogout = () => {
    setIsMobileMenuOpen(false); // Close mobile menu if open

    toast((t) => (
      <div className="flex flex-col gap-3 p-1">
        <div className="flex flex-col">
          <span className="font-black text-[10px] text-brand-navy uppercase tracking-widest">
            Confirm Logout
          </span>
          <span className="text-slate-500 text-[11px] font-medium">
            Are you sure you want to leave?
          </span>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              executeLogout();
            }}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white text-[9px] font-black py-2.5 rounded-lg transition-colors uppercase tracking-tighter"
          >
            Yes, Logout
          </button>
          
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[9px] font-black py-2.5 rounded-lg transition-colors uppercase tracking-tighter"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 6000,
      position: 'top-center',
      style: {
        borderRadius: '20px',
        background: '#fff',
        border: '1px solid #f1f5f9',
        minWidth: '260px',
        padding: '12px'
      },
    });
  };

  const menuItems = [
    { name: 'Overview', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Orders', icon: <ClipboardList size={20} />, path: '/dashboard/orders' },
    { name: 'Services', icon: <Shirt size={20} />, path: '/dashboard/services' },
    { name: 'Staff', icon: <Users size={20} />, path: '/dashboard/staff' },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-teal rounded-lg">
            <Shirt size={24} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Mufti Spot</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-white/60 hover:text-white">
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            {item.icon}
            <span className="font-medium text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
        >
          <LogOut size={20} />
          <span className="font-bold text-sm uppercase tracking-wider">Sign Out</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 relative">
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-[100] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-brand-navy text-white z-[101] transform transition-transform duration-300 ease-in-out md:hidden
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <SidebarContent />
      </aside>

      <aside className="w-64 bg-brand-navy text-white hidden md:flex flex-col">
        <SidebarContent />
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 sticky top-0 z-40 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 md:hidden text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <h2 className="font-semibold text-slate-700 uppercase tracking-wider text-xs md:text-sm">
              Admin <span className="hidden sm:inline">Management</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-brand-navy leading-none">{user?.name}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{user?.role}</p>
            </div>
            <div className="w-10 h-10 bg-brand-teal/10 text-brand-teal rounded-full flex items-center justify-center font-bold border border-brand-teal/20">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;