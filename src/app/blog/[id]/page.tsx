import BlogPostClient from "./BlogPostClient";

const blogs = [
  {
    id: 1,
    title: "But You Create Miracles For Others... How Can You Feel Low?",
    excerpt:
      "Every coach, healer and leader carries silent pain. But here's the truth: the healer also needs healing.",
    tag: "Energy & Frequency",
    date: "Mar 2025",
    readTime: "6 min read",
    content:
      "\"But you create miracles for others… how can you ever feel low?\" 😳\n\nI smile when people ask me this.\n\nBecause yes - I help others heal, transform and reconnect with their bodies…\nBut I am also human.\n\nWhat most people don't realize is that coaches, healers, leaders too have moments of doubt, heaviness and silence.\n\nOur lives are not without ups and downs. The only difference is, even in those moments, we choose to spread more light in the world.\n\nAnd here's something I've seen again and again:\n\nWhen I speak with coaches or energy workers, they don't even have to tell me ..\nI can perceive the energy of their past still weighing on them. Old hurts still bothering them.\n\nBut because they are \"the coach\"… they feel they cannot admit it.\n\nBecause they are \"the healer\"… they hide it out of fear of judgment.\n\nAnd honestly — that breaks my heart. 💔\n\nSo much silent pain, carried quietly… just because of the pressure to appear perfect.\n\nBut here's the truth:\n• The healer also needs healing.\n• The giver also needs to receive.\n• The leader also needs a space to be vulnerable.\n\nThe days are gone when vulnerability was seen as weakness.\n\nToday, vulnerability is courage. It is leadership.\n\nSo to every coach, healer, leader reading this ..\nplease remember:\n• You are human.\n• You are allowed to ask for help.\n• You are allowed to receive.\n\nBecause unless we are truly happy inside out, how can we spread more happiness in the world?\n\nAnd from my heart ❤️\ndeep gratitude to every one of you…\n\nFor the light you spread.\nFor the courage you show.\nFor choosing, again and again, to contribute to others at your fullest.\n\nBut remember -\nyou don't have to walk alone.\n\nI'm here for you. Always.\nIf you've been waiting for a hand to hold, this is it.\n\nLet's come forward. Let's hold each other's hands.\n\nBecause together, we can create a world where even healers, coaches and leaders feel safe to receive.\n\nEase & magic\nRaseshvari",
  },
  {
    id: 2,
    title: "Peace or Pressure — What Are You Still Holding Onto?",
    excerpt:
      "Three years back, life forced me to pause. I chose peace over pressure and released everything. Here's what I learned.",
    tag: "Revenue Energetics™",
    date: "Feb 2025",
    readTime: "7 min read",
    content:
      "PEACE or PRESSURE - what are you still holding on to, just because you once created it?\n\nThree years back, life forced me to pause.\nNot a gentle pause...  a complete collapse!!\n\nMy body gave up.\nMy mind went blank.\n\nAnd suddenly, all the things I had built - my community, my organization, my brand, didn't matter anymore.\n\nI didn't have the strength to handle them.\nI didn't even have the will to continue.\n\nSo I made a decision most people are scared to make..\nYes, I decided to let it all go.\n\nA few of my close friends said,\n\"Ras, you were doing so well. Don't leave everything.\"\n\nBut deep down, I knew that for me, peace was more important than pressure.\n\nWhat's the point of holding something just because you once created it,\nif it's not contributing to your happiness in the present?\n\nSo I released it all.\nThe name. The work. The identity I had built for years.\n\nIt wasn't easy.\nBut the moment I let go, I felt light.\n\nFree from the weight.\nAlmost like a child again :) no pressure, no roles, no masks.\n\nAnd today, when I look back, I know, it was the wisest decision of my life.\n\nYes, I had to start again from zero.\nBut there's no baggage.\nJust excitement, peace and a comeback that feels like a phoenix rising from the ashes.\n\nSo I ask you:\n👉 What are you still holding on to, just because you once created it?\n👉 What if letting go is the real act of leadership?\n\nBecause when you keep holding things that no longer serve your present,  the energy becomes heavy.\n\nAnd heaviness will always pull you down,\nno matter how high your title or success.\n\nAt some point, you have to choose -\n✨ Peace or Pressure.!!\n\nWe all have that choice. 💫\nWhat's yours?",
  },
];

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    id: blog.id.toString(),
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blogId = parseInt(id, 10);
  const blog = blogs.find((b) => b.id === blogId);

  if (!blog) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#fdf8f4] to-[#fef5ef]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
          <p className="text-2xl font-[var(--font-playfair)] text-[#1a0e0e]">
            Blog post not found
          </p>
          <a
            href="/#blog"
            className="text-[#c42d2d] hover:text-[#a01f1f] mt-6 inline-block"
          >
            ← Back to Blog
          </a>
        </div>
      </main>
    );
  }

  const relatedBlogs = blogs.filter((b) => b.id !== blog.id);

  return <BlogPostClient blog={blog} relatedBlogs={relatedBlogs} />;
}
