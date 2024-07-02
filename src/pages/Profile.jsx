import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const dummyUser = {
  username: "john_doe",
  bio: "Photographer & Traveler",
  profilePicture: "https://via.placeholder.com/150",
  photos: [
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
  ],
};

const Profile = () => {
  const [user] = useState(dummyUser);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={user.profilePicture} />
          <AvatarFallback>{user.username[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{user.username}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {user.photos.map((photo, index) => (
          <Card key={index}>
            <CardContent>
              <img src={photo} alt={`User photo ${index + 1}`} className="w-full h-auto" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Profile;