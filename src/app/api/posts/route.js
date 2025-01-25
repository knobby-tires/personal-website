import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), 'src/content/blog');
    const filenames = await fs.readdir(postsDirectory);

    const posts = await Promise.all(
      filenames.map(async (filename) => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        
        // Process markdown to HTML
        const processedContent = await remark()
          .use(html)
          .process(content);
        const contentHtml = processedContent.toString();

        return {
          title: data.title,
          date: data.date,
          coverImage: data.coverImage || null,
          content: contentHtml,
          filename: filename
        };
      })
    );

    return Response.json(posts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return Response.json([]);
  }
}