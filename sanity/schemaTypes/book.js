// lib/schemaTypes/book.js

function hindiToRoman(input) {
  if (!input) return "";

  const consonants = {
    क: "k", ख: "kh", ग: "g", घ: "gh", ङ: "ng",
    च: "ch", छ: "chh", ज: "j", झ: "jh", ञ: "ny",
    ट: "t", ठ: "th", ड: "d", ढ: "dh", ण: "n",
    त: "t", थ: "th", द: "d", ध: "dh", न: "n",
    प: "p", फ: "ph", ब: "b", भ: "bh", म: "m",
    य: "y", र: "r", ल: "l", व: "v", ळ: "l",
    श: "sh", ष: "sh", स: "s", ह: "h",
    क्ष: "ksh", त्र: "tr", ज्ञ: "gya",
  };

  const vowels = {
    अ: "a", आ: "aa", इ: "i", ई: "ee", उ: "u",
    ऊ: "oo", ऋ: "ri", ए: "e", ऐ: "ai", ओ: "o", औ: "au",
  };

  const matras = {
    "ा": "aa", "ि": "i", "ी": "ee", "ु": "u", "ू": "oo",
    "ृ": "ri", "े": "e", "ै": "ai", "ो": "o", "ौ": "au",
  };

  const specials = { "ं": "n", "ः": "h", "ँ": "n", "्": "" };

  const dict = {
    में: "mein", की: "ki", का: "ka", के: "ke", और: "aur",
    से: "se", पर: "par", है: "hai", हुई: "hui", हुआ: "hua",
    को: "ko", ने: "ne", एक: "ek", यह: "yah", वह: "vah",
    था: "tha", थी: "thi", हैं: "hain", हो: "ho",
    गया: "gaya", गई: "gayi", दिया: "diya", लिया: "liya",
  };

  const cleaned = input
    .trim()
    .replace(/[।!?,.]/g, "")
    .replace(/[\u0964\u0965]/g, "")
    .replace(/\s+/g, " ");

  const words = cleaned.split(" ");
  const transliteratedWords = [];

  for (let word of words) {
    word = word.trim();
    if (!word) continue;

    const lowerWord = word.toLowerCase();
    if (dict[lowerWord]) {
      transliteratedWords.push(dict[lowerWord]);
      continue;
    }

    let result = "";
    let i = 0;

    while (i < word.length) {
      const char = word[i];
      const nextChar = word[i + 1];
      const twoChar = char + nextChar;

      if (consonants[twoChar]) {
        result += consonants[twoChar];
        i += 2;
        continue;
      }

      if (vowels[char]) {
        result += vowels[char];
        i++;
        continue;
      }

      if (consonants[char]) {
        result += consonants[char];

        if (matras[nextChar]) {
          result += matras[nextChar];
          i += 2;
          continue;
        } else if (nextChar === "्") {
          i += 2;
          continue;
        } else if (nextChar && !consonants[nextChar] && !vowels[nextChar]) {
          i++;
          continue;
        } else {
          result += "a";
          i++;
          continue;
        }
      }

      if (specials[char] !== undefined) {
        result += specials[char];
        i++;
        continue;
      }

      if (/[a-zA-Z0-9]/.test(char)) {
        result += char.toLowerCase();
        i++;
        continue;
      }

      i++;
    }

    if (result) {
      transliteratedWords.push(result);
    }
  }

  return transliteratedWords.join("-");
}

export default {
  name: 'book',
  title: 'पुस्तकें',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'पुस्तक का नाम',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) => {
          const romanized = hindiToRoman(input);
          const timePart = new Date()
            .toISOString()
            .replace(/[-:.TZ]/g, "")
            .slice(0, 14);
          return `${romanized}-${timePart}`;
        },
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'लेखक का नाम',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'मूल्य (₹)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    },
    {
      name: 'coverImage',
      title: 'आवरण पृष्ठ',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'विवरण',
      type: 'text',
      rows: 6,
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'coverImage',
    },
    prepare(selection) {
      const { title, author, media } = selection;
      return {
        title: title,
        subtitle: `लेखक: ${author}`,
        media: media,
      };
    },
  },
};