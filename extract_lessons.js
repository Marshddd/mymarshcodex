const fs = require('fs');

const dbPath = 'C:/New2/data/db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

let markdown = '# เนื้อหาบทเรียน Backend Mastery ทั้งหมด\n\n';
markdown += 'นี่คือเนื้อหาทั้งหมดของรายวิชา Backend Mastery ที่ประกอบด้วย 6 หน่วยการเรียนรู้ แต่ละหน่วยมี 3 บทเรียนย่อย เพื่อนำไปสร้างวิดีโอหรือสรุปเนื้อหา\n\n';

db.courses.forEach(course => {
  markdown += `## ${course.unit}: ${course.title}\n`;
  markdown += `**คำอธิบาย:** ${course.desc}\n\n`;
  
  course.lessons.forEach(lesson => {
    markdown += `### ${lesson.title}\n`;
    
    // Clean up HTML tags for better NotebookLM reading
    let cleanContent = lesson.content
      .replace(/<h3>(.*?)<\/h3>/g, '#### $1\n')
      .replace(/<p>(.*?)<\/p>/g, '$1\n')
      .replace(/<ul>/g, '\n')
      .replace(/<\/ul>/g, '\n')
      .replace(/<li>(.*?)<\/li>/g, '- $1\n')
      .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
      .replace(/<code>(.*?)<\/code>/g, '`$1`')
      .replace(/<pre><code.*?>([\s\S]*?)<\/code><\/pre>/g, '```javascript\n$1\n```\n')
      .replace(/<pre>([\s\S]*?)<\/pre>/g, '```\n$1\n```\n')
      .replace(/<br\s*\/?>/g, '\n');
    
    // Fallback removing all other html tags just in case
    cleanContent = cleanContent.replace(/<[^>]*>?/gm, '');
    
    // Unescape html entities
    cleanContent = cleanContent
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
      
    markdown += `${cleanContent.trim()}\n\n---\n\n`;
  });
});

fs.writeFileSync('C:/Users/mata2/.gemini/antigravity/brain/886bfcca-8e7d-4d99-b9a6-a795d68ca7d0/Backend_Mastery_Lessons.md', markdown);
console.log('Markdown successfully generated!');
