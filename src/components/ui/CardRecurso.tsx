interface CardRecursoProps {
  title: string;
  description: string;
  imageUrl: string;
  tagText: string;
  hasSparkleIcon?: boolean; 
  link: string;
}

export default function CardRecurso({ 
  title, 
  description, 
  imageUrl, 
  tagText, 
  hasSparkleIcon = false,
  link 
}: CardRecursoProps) {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 group"
    >
      <div className="relative h-48 w-full bg-slate-200">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute top-4 left-4 bg-[#00966D] text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
          {hasSparkleIcon && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          )}
          {tagText}
        </div>
      </div>

      <div className="p-5 flex items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-[#0F172A] font-bold text-lg leading-tight mb-1">
            {title}
          </h3>
          <p className="text-slate-500 text-sm line-clamp-2">
            {description}
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-[#dcfce7] text-[#00966D] flex flex-shrink-0 items-center justify-center group-hover:bg-[#00966D] group-hover:text-white transition-colors duration-300">
          <svg 
            width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" 
            className="transform group-hover:translate-x-1 transition-transform duration-300"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
}