import DashboardLayout from "@/components/layouts/DashboardLayout";
import Image from "next/image";
import { Text } from "@/components/ui/Typography";

export default function DashboardPage() {
  return (
    // <DashboardLayout>
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Image
          src="/icons/NoData.png"
          alt="warning"
          width={250}
          height={250}
          className="rounded-full text-center text-gray-400 opacity-60 grayscale"
        />
        <Text weight="medium" className="text-gray-500 text-sm">Once your Manager approves the role,</Text>
        <Text weight="medium" className="text-gray-500 text-sm">additional functionalities will be visible.</Text>
      </div>
    </div>
    // </DashboardLayout>
  );
}