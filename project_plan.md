
I am planning to build an online public archive for a local magazine. They have many files containing back issues of the magazine going back many years. I want to store the back issues (pdfs) and make them accessible via a simple UI. I have just submitted a proposal to the magazine and I want to build a demo of the project to show them. 

Below is the rough outline of what the actual project will use. 

File storage (the backbone)

Use something like:
- Amazon S3
- Cloudflare R2
- Google Cloud Storage


Database (for organization)

Store metadata only:
- Issue title 
- Publication date 
- Tags (events, people, etc.) 
- File URL (link to storage)
Use Postgres

(Maybe want to add search within magazine issues? This would be more complex and incur more costs but would be super cool.

Use node/express for backend, could use supabase if we wanna move quick

Next js for front end


4. Data ingestion (often overlooked, but critical)

This might be the hardest part.
You’ll need to:
Collect all PDFs from old machines 
Normalize file names (e.g., 1998-05_issue.pdf)
Extract metadata (date, title) 
Upload to storage 
Index text for search 

may need a small script or pipeline to automate this.


We need to build a basic demo version of this project for now, and build the real thing after we get approval. 



Demo Build Notes:

Emulate New Yorker archive style

-Cover first browsing
-Date-as-navigation via a horizontal bar at the top
-Restrained Typography. Source Serif 4
-PDF reader takes over screen

Possible JSON shape: 
{
  "id": "1998-05",
  "title": "May 1998",
  "issue_number": 47,
  "volume": 12,
  "publication_date": "1998-05-01",
  "cover_image": "/covers/1998-05.jpg",
  "pdf_url": "/issues/1998-05.pdf",
  "page_count": 48,
  "summary": "A short editorial blurb shown on the detail page.",
  "tags": ["town-council", "summer-festival", "local-business"],
  "featured_articles": [
    { "title": "The Festival Returns", "page": 12, "author": "J. Smith" }
  ]
}

-React PDF viewer

Possibly add basic analytics so the magazine can track which back issues are being viewed most often. 