import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, ThumbsUp, Phone, Users, HelpCircle } from "lucide-react";

const CommunityForum = () => {
  const forumPosts = [
    {
      id: 1,
      author: "Ramesh Kumar",
      location: "Punjab",
      crop: "Wheat",
      title: "Best fertilizer for wheat in winter season?",
      preview: "I'm looking for recommendations on the best fertilizer combination for wheat during winter...",
      replies: 12,
      likes: 8,
      time: "2 hours ago"
    },
    {
      id: 2,
      author: "Priya Sharma",
      location: "Maharashtra",
      crop: "Cotton",
      title: "Pest control for cotton without chemicals",
      preview: "Has anyone tried organic pest control methods for cotton? Looking for natural alternatives...",
      replies: 7,
      likes: 15,
      time: "5 hours ago"
    },
    {
      id: 3,
      author: "Suresh Patel",
      location: "Gujarat",
      crop: "Rice",
      title: "Water management during monsoon",
      preview: "Excessive rainfall is affecting my rice crop. Need advice on drainage and water management...",
      replies: 9,
      likes: 6,
      time: "1 day ago"
    }
  ];

  const helplineNumbers = [
    { name: "Kisan Call Center", number: "1551", description: "24/7 Agricultural Helpline" },
    { name: "Soil Health Card", number: "1800-180-1551", description: "Soil Testing Support" },
    { name: "Weather Advisory", number: "1588", description: "Weather Information" }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Help Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>Emergency Helpline</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {helplineNumbers.map((helpline, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-lg">{helpline.number}</p>
                    <p className="text-sm opacity-90">{helpline.name}</p>
                    <p className="text-xs opacity-75">{helpline.description}</p>
                  </div>
                  <Button size="sm" variant="secondary" className="text-primary">
                    Call
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Community Stats</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">1,247</div>
                <p className="text-sm text-muted-foreground">Active Farmers</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">89</div>
                <p className="text-sm text-muted-foreground">Experts Online</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">3,456</div>
                <p className="text-sm text-muted-foreground">Questions Solved</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <p className="text-sm text-muted-foreground">Support</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Forum Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span>Community Discussions</span>
            </div>
            <Button size="sm">
              <HelpCircle className="h-4 w-4 mr-2" />
              Ask Question
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {forumPosts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{post.author}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-muted-foreground">{post.location}</p>
                        <Badge variant="secondary" className="text-xs">{post.crop}</Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
                
                <h3 className="font-semibold mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{post.preview}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.replies} replies</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{post.likes} likes</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Discussion
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityForum;