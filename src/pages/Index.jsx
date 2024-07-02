import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import { Heart } from "lucide-react"; // Import Heart icon

const dummyPosts = [
  {
    id: uuidv4(),
    username: "john_doe",
    caption: "Beautiful sunset!",
    imageUrl: "https://via.placeholder.com/300",
    likes: 0, // Add likes property
  },
  {
    id: uuidv4(),
    username: "jane_smith",
    caption: "Loving the new camera!",
    imageUrl: "https://via.placeholder.com/300",
    likes: 0, // Add likes property
  },
];

const Index = () => {
  const [posts, setPosts] = useState(dummyPosts);
  const [newPost, setNewPost] = useState({ username: "", caption: "", imageUrl: "" });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPost.username && newPost.caption && selectedFile) {
      setPosts([{ id: uuidv4(), ...newPost, imageUrl: selectedFile, likes: 0 }, ...posts]);
      setNewPost({ username: "", caption: "", imageUrl: "" });
      setSelectedFile(null);
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="username"
          placeholder="Your username"
          value={newPost.username}
          onChange={handleInputChange}
        />
        <Textarea
          name="caption"
          placeholder="Write a caption..."
          value={newPost.caption}
          onChange={handleInputChange}
        />
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <Button type="submit">Share Photo</Button>
      </form>
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.username}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={post.imageUrl} alt={post.caption} className="w-full h-auto" />
              <p>{post.caption}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Button variant="ghost" size="sm" onClick={() => handleLike(post.id)}>
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="ml-2">{post.likes}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;