interface PersonalInfoProps {
  user: {
    phone?: string;
    birth_date?: string;
    skin_type?: string;
  };
}

export function PersonalInfo({ user }: PersonalInfoProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">
        Personal Information
      </h3>

      <div>
        <p className="text-sm font-medium text-gray-500">
          Phone Number
        </p>
        <p className="text-gray-900">
          {user.phone || "Not provided"}
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-500">
          Birth Date
        </p>
        <p className="text-gray-900">
          {user.birth_date
            ? new Date(user.birth_date).toLocaleDateString()
            : "Not provided"}
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-500">
          Skin Type
        </p>
        <p className="text-gray-900 capitalize">
          {user.skin_type || "Not provided"}
        </p>
      </div>
    </div>
  );
}

export default PersonalInfo;