// import React from "react";
// // Removed PanelLeftClose and PanelLeft as they are no longer needed
// import {
//   ChevronDown,
//   Plus,
//   ChevronRight,
//   File,
//   MoreHorizontal,
//   Folder,
// } from "lucide-react";
// import Input from "@/components/ui/Input";

// // Types
// type RequestTab = { id: string; name: string; method: string; url: string };
// type SavedResponse = {
//   id: string;
//   name: string;
//   data: any;
//   status: string;
//   time: string;
//   size: string;
// };
// type Request = {
//   id: string;
//   name: string;
//   method: string;
//   url: string;
//   savedResponses?: SavedResponse[];
// };
// type Folder = {
//   id: string;
//   name: string;
//   requests: Request[];
//   isExpanded?: boolean;
// };
// type Collection = { id: string; name: string; folders: Folder[] };

// interface SidebarProps {
//   collections: Collection[];
//   isCollapsed: boolean;
//   onToggle: () => void;
//   onAddTab: (tab?: Partial<RequestTab>) => void;
//   onToggleFolder: (collectionId: string, folderId: string) => void;
//   onAddCollection: (name: string) => void;
//   onAddFolder: (collectionId: string, name: string) => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({
//   collections,
//   isCollapsed,
//   onToggle,
//   onAddTab,
//   onToggleFolder,
//   onAddCollection,
//   onAddFolder,
// }) => {
//   const getMethodColor = (method: string) => {
//     switch (method) {
//       case "POST":
//         return "text-yellow-600 font-bold";
//       case "GET":
//         return "text-green-600 font-bold";
//       case "PUT":
//         return "text-blue-600 font-bold";
//       case "DEL":
//       case "DELETE":
//         return "text-red-600 font-bold";
//       default:
//         return "text-gray-600";
//     }
//   };

//   if (isCollapsed) {
//     return (
//       <div className="w-[50px] bg-white border-r flex flex-col items-center py-4 transition-all duration-300">
//         {/* 
//            Changed: Using Collection Icon instead of PanelLeft.
//            Clicking this expands the sidebar.
//         */}
//         <button
//           onClick={onToggle}
//           className="p-2 hover:bg-gray-100 rounded"
//           title="Expand Sidebar"
//         >
//           <img
//             src="/icons/collection.png"
//             className="h-5 w-5"
//             alt="Expand Collections"
//           />
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="w-[300px] bg-white border-r flex flex-col h-screen overflow-hidden transition-all duration-300">
//       {/* Header with Search */}
//       <div className="p-3 border-b flex-shrink-0 flex justify-between items-center">
//         <div className="relative w-full">
//           {/* Search Icon Image */}
//           <img
//             src="/icons/search.png"
//             className="absolute left-2 top-2.5 h-4 w-4 z-10"
//             alt="Search"
//           />
//           <Input placeholder="Search" className="pl-8 pr-3 py-2 text-sm border-gray-200" />
//         </div>
//         {/* Removed the collapse icon button that was here previously */}
//       </div>

//       {/* Collections Header */}
//       {/* 
//          Changed: Added onClick={onToggle} to this div.
//          Clicking the "COLLECTIONS" header now collapses the sidebar.
//          Added cursor-pointer for UX.
//       */}
//       <div
//         className="px-3 py-2 flex justify-between items-center text-xs text-gray-500 font-semibold border-b flex-shrink-0 cursor-pointer hover:bg-gray-50"
//         onClick={onToggle}
//       >
//         <div className="flex items-center gap-1">
//           <img
//             src="/icons/collection.png"
//             className="h-4 w-4"
//             alt="Collections"
//           />
//           <span>COLLECTIONS</span>
//         </div>

//         {/* 
//            Stopping propagation so clicking these buttons 
//            performs their action instead of collapsing the sidebar.
//         */}
//         <div
//           className="flex items-center gap-1"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <Plus
//             className="h-4 w-4 cursor-pointer hover:text-gray-700"
//             onClick={() => {
//               const name = prompt("Enter collection name:");
//               if (name) onAddCollection(name);
//             }}
//           />
//           <MoreHorizontal className="h-4 w-4 cursor-pointer hover:text-gray-700" />
//         </div>
//       </div>

//       {/* Scrollable Collections Area */}
//       <div className="flex-1 overflow-y-auto p-2">
//         {collections.map((collection) => (
//           <div key={collection.id} className="mb-3">
//             {/* Collection Item */}
//             <div className="flex items-center gap-1 text-sm font-medium mb-1 group cursor-pointer">
//               <ChevronDown className="h-4 w-4" />
//               <span className="truncate">{collection.name}</span>
//               <button
//                 onClick={() => {
//                   const name = prompt("Enter folder name:");
//                   if (name) onAddFolder(collection.id, name);
//                 }}
//                 className="ml-auto opacity-0 group-hover:opacity-100 flex-shrink-0"
//               >
//                 <Plus className="h-3 w-3" />
//               </button>
//             </div>

//             {/* Folders inside Collection */}
//             {collection.folders.map((folder) => (
//               <div key={folder.id} className="ml-4">
//                 <div
//                   className="flex items-center gap-1 text-sm cursor-pointer hover:bg-gray-100 p-1 rounded group"
//                   onClick={() => onToggleFolder(collection.id, folder.id)}
//                 >
//                   {folder.isExpanded ? (
//                     <ChevronDown className="h-4 w-4 flex-shrink-0" />
//                   ) : (
//                     <ChevronRight className="h-4 w-4 flex-shrink-0" />
//                   )}
//                   <Folder className="h-4 w-4 text-gray-500 flex-shrink-0" />
//                   <span className="truncate">{folder.name}</span>
//                   <button className="ml-auto opacity-0 group-hover:opacity-100 flex-shrink-0">
//                     <Plus className="h-3 w-3" />
//                   </button>
//                 </div>

//                 {/* Requests inside Folder */}
//                 {folder.isExpanded && (
//                   <div className="ml-6 mt-1 space-y-1">
//                     {folder.requests.map((request) => (
//                       <div key={request.id}>
//                         <div
//                           onClick={() =>
//                             onAddTab({
//                               name: request.name,
//                               method: request.method,
//                               url: request.url,
//                             })
//                           }
//                           className="cursor-pointer hover:bg-gray-100 p-1.5 rounded text-sm flex items-center gap-2 group"
//                         >
//                           <span
//                             className={`text-xs font-mono w-12 flex-shrink-0 ${getMethodColor(request.method)}`}
//                           >
//                             {request.method}
//                           </span>
//                           <span className="flex-1 truncate">
//                             {request.name}
//                           </span>
//                         </div>

//                         {/* Saved responses */}
//                         {request.savedResponses?.map((sr) => (
//                           <div
//                             key={sr.id}
//                             className="text-sm text-gray-500 pl-14 hover:bg-gray-50 cursor-pointer truncate"
//                           >
//                             {sr.name}
//                           </div>
//                         ))}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React from "react";
import {
  ChevronDown,
  Plus,
  ChevronRight,
  MoreHorizontal,
  Folder,
} from "lucide-react";
import Input from "@/components/ui/Input";

// Types
type RequestTab = { id: string; name: string; method: string; url: string };
type SavedResponse = {
  id: string;
  name: string;
  data: any;
  status: string;
  time: string;
  size: string;
};
type Request = {
  id: string;
  name: string;
  method: string;
  url: string;
  savedResponses?: SavedResponse[];
};
type Folder = {
  id: string;
  name: string;
  requests: Request[];
  isExpanded?: boolean;
};
type Collection = { id: string; name: string; folders: Folder[] };

interface SidebarProps {
  collections: Collection[];
  isCollapsed: boolean;
  onToggle: () => void;
  onAddTab: (tab?: Partial<RequestTab>) => void;
  onToggleFolder: (collectionId: string, folderId: string) => void;
  onAddCollection: (name: string) => void;
  onAddFolder: (collectionId: string, name: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  collections,
  isCollapsed,
  onToggle,
  onAddTab,
  onToggleFolder,
  onAddCollection,
  onAddFolder,
}) => {
  const getMethodColor = (method: string) => {
    switch (method) {
      case "POST":
        return "text-yellow-600 font-bold";
      case "GET":
        return "text-green-600 font-bold";
      case "PUT":
        return "text-blue-600 font-bold";
      case "DEL":
      case "DELETE":
        return "text-red-600 font-bold";
      default:
        return "text-gray-600";
    }
  };

  if (isCollapsed) {
    return (
      <div className="w-[50px] bg-white border-r flex flex-col items-center py-4 transition-all duration-300 gap-4">
        {/* Search Icon Button */}
        <button
          className="p-2 hover:bg-gray-100  flex items-center justify-center w-8 h-8 border border-gray-200 rounded-md"
          title="Search"
        >
          <img
            src="/icons/search.png"
            className="h-3 w-3"
            alt="Search"
          />
        </button>

        {/* Collection Icon Button with Purple Background and Left Border */}
        <button
          onClick={onToggle}
          className="p-2 rounded flex items-center justify-center w-8 h-8  border-l-4 border-purple-800 shadow-sm"
          title="Expand Collections"
        >
          {/* Using invert to make the black icon white, or you can use a specific white icon */}
          <img
            src="/icons/collection.png"
            className="h-4 w-4 "
            alt="Expand Collections"
          />
        </button>
      </div>
    );
  }

  return (
    <div className="w-[300px] bg-white border-r flex flex-col h-screen overflow-hidden transition-all duration-300">
      {/* Header with Search */}
      <div className="p-3 border-b flex-shrink-0 flex justify-between items-center">
        <div className="relative w-full">
          {/* Search Icon Image */}
          <img
            src="/icons/search.png"
            className="absolute left-2 top-2.5 h-4 w-4 z-10"
            alt="Search"
          />
          <Input placeholder="Search" className="pl-8 pr-3 py-2 text-sm border-gray-200" />
        </div>
      </div>

      {/* Collections Header */}
      <div
        className="px-3 py-2 flex justify-between items-center text-xs text-gray-500 font-semibold border-b flex-shrink-0 cursor-pointer hover:bg-gray-50"
        onClick={onToggle}
      >
        <div className="flex items-center gap-1">
          <img
            src="/icons/collection.png"
            className="h-4 w-4"
            alt="Collections"
          />
          <span>COLLECTIONS</span>
        </div>

        <div
          className="flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <Plus
            className="h-4 w-4 cursor-pointer hover:text-gray-700"
            onClick={() => {
              const name = prompt("Enter collection name:");
              if (name) onAddCollection(name);
            }}
          />
          <MoreHorizontal className="h-4 w-4 cursor-pointer hover:text-gray-700" />
        </div>
      </div>

      {/* Scrollable Collections Area */}
      <div className="flex-1 overflow-y-auto p-2">
        {collections.map((collection) => (
          <div key={collection.id} className="mb-3">
            {/* Collection Item */}
            <div className="flex items-center gap-1 text-sm font-medium mb-1 group cursor-pointer">
              <ChevronDown className="h-4 w-4" />
              <span className="truncate">{collection.name}</span>
              <button
                onClick={() => {
                  const name = prompt("Enter folder name:");
                  if (name) onAddFolder(collection.id, name);
                }}
                className="ml-auto opacity-0 group-hover:opacity-100 flex-shrink-0"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            {/* Folders inside Collection */}
            {collection.folders.map((folder) => (
              <div key={folder.id} className="ml-4">
                <div
                  className="flex items-center gap-1 text-sm cursor-pointer hover:bg-gray-100 p-1 rounded group"
                  onClick={() => onToggleFolder(collection.id, folder.id)}
                >
                  {folder.isExpanded ? (
                    <ChevronDown className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 flex-shrink-0" />
                  )}
                  <Folder className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <span className="truncate">{folder.name}</span>
                  <button className="ml-auto opacity-0 group-hover:opacity-100 flex-shrink-0">
                    <Plus className="h-3 w-3" />
                  </button>
                </div>

                {/* Requests inside Folder */}
                {folder.isExpanded && (
                  <div className="ml-6 mt-1 space-y-1">
                    {folder.requests.map((request) => (
                      <div key={request.id}>
                        <div
                          onClick={() =>
                            onAddTab({
                              name: request.name,
                              method: request.method,
                              url: request.url,
                            })
                          }
                          className="cursor-pointer hover:bg-gray-100 p-1.5 rounded text-sm flex items-center gap-2 group"
                        >
                          <span
                            className={`text-xs font-mono w-12 flex-shrink-0 ${getMethodColor(request.method)}`}
                          >
                            {request.method}
                          </span>
                          <span className="flex-1 truncate">
                            {request.name}
                          </span>
                        </div>

                        {/* Saved responses */}
                        {request.savedResponses?.map((sr) => (
                          <div
                            key={sr.id}
                            className="text-sm text-gray-500 pl-14 hover:bg-gray-50 cursor-pointer truncate"
                          >
                            {sr.name}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;