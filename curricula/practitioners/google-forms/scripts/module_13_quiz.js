/**
 * Module 13 Quiz: Clustering
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
  var form = FormApp.create('Module 13 Quiz: Clustering');
  
  // Enable quiz mode
  form.setIsQuiz(true);
  
  // Set description
  form.setDescription('Test your understanding. 8 questions, ~10 minutes.\nYou will see explanations after each answer.');
  
  // Question 1
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('You\'re using K-means to segment customers. The features are: annual_income ($10K-$500K) and age (18-80). What should you do before clustering?')
    .setPoints(1)
    .setChoices([
      q1.createChoice('A) Nothing — K-means handles different scales automatically', false),
      q1.createChoice('B) Standardize both features to have mean=0, std=1', true),
      q1.createChoice('C) Remove outliers first', false),
      q1.createChoice('D) Use log transform on income', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('K-means uses Euclidean distance, which is dominated by features with larger scales. Income (range ~490K) would completely overshadow age (range ~62). Standardizing ensures both features contribute equally to clustering.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 2
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('Your elbow plot shows inertia decreasing smoothly with no clear elbow. What does this suggest?')
    .setPoints(1)
    .setChoices([
      q2.createChoice('A) Your data has no natural clusters', false),
      q2.createChoice('B) You should use more features', false),
      q2.createChoice('C) The data may not have distinct spherical clusters, or there\'s gradual structure', true),
      q2.createChoice('D) K-means isn\'t working properly', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('A smooth curve without an elbow suggests the data doesn\'t have clearly separated spherical clusters. The structure might be gradual, non-spherical, or truly continuous. Consider DBSCAN, exploring the data visually, or accepting that discrete clusters may not be the right model.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 3
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('Your K-means clustering gives silhouette scores: K=3 (0.45), K=4 (0.52), K=5 (0.48), K=6 (0.41). Which K would you choose?')
    .setPoints(1)
    .setChoices([
      q3.createChoice('A) K=3 — fewer clusters are easier to interpret', false),
      q3.createChoice('B) K=4 — highest silhouette score', true),
      q3.createChoice('C) K=5 — more granular segments', false),
      q3.createChoice('D) K=6 — more detail is always better', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('The silhouette score measures cluster quality — higher is better. K=4 has the highest score (0.52), indicating the best separation between clusters. However, you should also consider business requirements and interpretability.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 4
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('You cluster support tickets and find one cluster has 80% of all tickets while 4 other clusters have 5% each. What might this indicate?')
    .setPoints(1)
    .setChoices([
      q4.createChoice('A) K-means failed — try again with different initialization', false),
      q4.createChoice('B) The dominant cluster might contain multiple sub-topics that should be split', true),
      q4.createChoice('C) This is expected — some issues are more common', false),
      q4.createChoice('D) You should use equal-size clustering', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('While imbalanced clusters can be natural (some issues are common), an 80% cluster likely contains heterogeneous content. You should examine this cluster to see if it makes sense as a single category or should be further subdivided with a larger K.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 5
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('Your data has crescent-shaped and circular clusters (like two moons). K-means gives poor results. What algorithm should you try?')
    .setPoints(1)
    .setChoices([
      q5.createChoice('A) Agglomerative clustering with more clusters', false),
      q5.createChoice('B) DBSCAN — it can find arbitrary cluster shapes', true),
      q5.createChoice('C) K-means with more iterations', false),
      q5.createChoice('D) Increase K to 10', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('K-means assumes spherical clusters and fails on crescent/moon shapes. DBSCAN is density-based and can discover clusters of arbitrary shapes by connecting nearby points, making it ideal for non-spherical patterns.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 6
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('DBSCAN labels some points as -1. What does this mean?')
    .setPoints(1)
    .setChoices([
      q6.createChoice('A) These points couldn\'t be processed', false),
      q6.createChoice('B) These are noise/outlier points not belonging to any cluster', true),
      q6.createChoice('C) These points should be in cluster 0', false),
      q6.createChoice('D) The algorithm needs more iterations', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('DBSCAN identifies points in low-density regions as noise and labels them -1. This is a feature, not a bug — it automatically handles outliers rather than forcing them into clusters where they don\'t belong.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 7
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('You\'ve clustered customers into 5 segments. A stakeholder asks "How do we know these segments are real?" The best response is:')
    .setPoints(1)
    .setChoices([
      q7.createChoice('A) "The silhouette score is 0.55, which indicates good separation"', false),
      q7.createChoice('B) "Let me show you the profile of each segment — they have distinct behaviors, and the segments align with how your sales team thinks about customers"', true),
      q7.createChoice('C) "K-means is a proven algorithm used by many companies"', false),
      q7.createChoice('D) "We ran the algorithm multiple times and got consistent results"', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Business stakeholders need to see that clusters are interpretable and actionable. Showing distinct profiles (with concrete differences in behavior) and relating to business intuition is more convincing than citing statistical scores or algorithm credentials.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 8
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('When should you consider using hierarchical clustering instead of K-means?')
    .setPoints(1)
    .setChoices([
      q8.createChoice('A) When you have more than 10,000 data points', false),
      q8.createChoice('B) When you don\'t know K in advance and want to explore different levels of grouping', true),
      q8.createChoice('C) When clusters must be spherical', false),
      q8.createChoice('D) When you need the fastest possible runtime', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Hierarchical clustering produces a dendrogram showing clusters at all levels, letting you choose K after seeing the structure. It\'s useful for exploration when you\'re unsure about K. However, it\'s slower than K-means, so it\'s not ideal for very large datasets.')
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
