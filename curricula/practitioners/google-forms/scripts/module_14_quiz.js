/**
 * Module 14 Quiz: Retrieval
 * 
 * HOW TO RUN:
 * 1. Go to https://script.google.com
 * 2. Create new project (or use existing)
 * 3. Paste this code (replace any existing code)
 * 4. Click Run → createQuiz
 * 5. Authorize when prompted
 * 6. Check your Google Drive for the new form
 * 7. Copy the published URL from the Logs
 */

function createQuiz() {
  // Create the form
  var form = FormApp.create('Module 14 Quiz: Retrieval');
  
  // Enable quiz mode
  form.setIsQuiz(true);
  
  // Set description
  form.setDescription('Test your understanding. 8 questions, ~10 minutes.\nYou will see explanations after each answer.');
  
  // Question 1
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('A user searches for "password reset" but the relevant article is titled "How to Change Your Login Credentials." Keyword search (BM25) returns no results. What approach would solve this?')
    .setPoints(1)
    .setChoices([
      q1.createChoice('A) Increase the number of results (K)', false),
      q1.createChoice('B) Use semantic/dense retrieval with embeddings', true),
      q1.createChoice('C) Add more keywords to the query', false),
      q1.createChoice('D) Lower the BM25 threshold', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('BM25 relies on exact term matching, so "password reset" won\'t match "login credentials." Semantic retrieval uses embeddings that capture meaning, so semantically similar queries will match even without keyword overlap.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 2
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('You\'re evaluating a retrieval system. For a test query, the relevant document appears at position 3. What is the Reciprocal Rank?')
    .setPoints(1)
    .setChoices([
      q2.createChoice('A) 3', false),
      q2.createChoice('B) 0.5', false),
      q2.createChoice('C) 0.33', true),
      q2.createChoice('D) 1', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Reciprocal Rank = 1 / position of first relevant result. If the first relevant document is at position 3, MRR = 1/3 ≈ 0.33. This metric rewards systems that place relevant results earlier.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 3
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('Your semantic search has high recall (finds most relevant docs) but low precision (returns many irrelevant docs). What should you try?')
    .setPoints(1)
    .setChoices([
      q3.createChoice('A) Increase K to get more results', false),
      q3.createChoice('B) Add a reranking stage to reorder results by relevance', true),
      q3.createChoice('C) Switch to keyword-only search', false),
      q3.createChoice('D) Remove the embedding model', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('A two-stage retrieve-then-rerank pipeline is standard. The retrieval stage prioritizes recall (cast a wide net), then a reranking model (often a cross-encoder) improves precision by carefully scoring each candidate for relevance to the query.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 4
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('You\'re building RAG for a support chatbot. Articles average 3,000 words. What chunking strategy is most appropriate?')
    .setPoints(1)
    .setChoices([
      q4.createChoice('A) Use entire articles as chunks (3,000 words each)', false),
      q4.createChoice('B) Split into 300-500 token chunks with 50 token overlap', true),
      q4.createChoice('C) Use individual sentences as chunks', false),
      q4.createChoice('D) Randomly sample paragraphs', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('3,000-word chunks are too large for LLM context and may contain irrelevant information. Single sentences lose context. Overlapping chunks of 300-500 tokens provide enough context while ensuring no information is lost at boundaries.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 5
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('Your retrieval system uses FAISS with IVF indexing. You set nprobe=1 and get very fast queries but poor results. What should you do?')
    .setPoints(1)
    .setChoices([
      q5.createChoice('A) Rebuild the index with more data', false),
      q5.createChoice('B) Increase nprobe to search more clusters', true),
      q5.createChoice('C) Switch to brute-force search', false),
      q5.createChoice('D) Use a smaller embedding model', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('IVF (Inverted File Index) clusters vectors and searches only nearby clusters. nprobe controls how many clusters to search — nprobe=1 is very fast but may miss relevant vectors in neighboring clusters. Increasing nprobe improves recall at the cost of some speed.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 6
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('You notice that technical queries with specific product codes (like "Model XR-7500") fail in semantic search but work perfectly in keyword search. The best solution is:')
    .setPoints(1)
    .setChoices([
      q6.createChoice('A) Remove keyword search entirely', false),
      q6.createChoice('B) Use hybrid search combining BM25 and semantic scores', true),
      q6.createChoice('C) Train a new embedding model from scratch', false),
      q6.createChoice('D) Ask users to describe products instead of using codes', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Hybrid search combines the strengths of both approaches: semantic search handles natural language and synonyms, while keyword search (BM25) handles exact matches like product codes. A weighted combination typically gives the best overall performance.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 7
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('Your RAG system retrieves relevant chunks, but the LLM sometimes ignores them and makes up information. This is called:')
    .setPoints(1)
    .setChoices([
      q7.createChoice('A) Retrieval failure', false),
      q7.createChoice('B) Embedding collapse', false),
      q7.createChoice('C) Hallucination / unfaithfulness', true),
      q7.createChoice('D) Index corruption', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('When an LLM generates information not grounded in the retrieved context, it\'s called hallucination or unfaithfulness. Even with good retrieval, LLMs may ignore context. Solutions include explicit prompting to use only retrieved information, and faithfulness evaluation metrics.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 8
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('A stakeholder asks why semantic search is better than their existing keyword search. The best explanation is:')
    .setPoints(1)
    .setChoices([
      q8.createChoice('A) "Semantic search uses neural networks which are more advanced than keywords"', false),
      q8.createChoice('B) "Semantic search finds relevant content by understanding meaning, so users find what they need even when they phrase questions differently than how articles are written"', true),
      q8.createChoice('C) "Semantic search is faster and cheaper than keyword search"', false),
      q8.createChoice('D) "Semantic search always returns more results"', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('The key benefit is semantic understanding — finding relevant content based on meaning rather than exact word matches. This addresses real user problems (different phrasing, synonyms) in a way stakeholders can understand and relate to their experience.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Log the URLs
  Logger.log('Form created successfully!');
  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Published URL: ' + form.getPublishedUrl());
  
  return form.getPublishedUrl();
}
