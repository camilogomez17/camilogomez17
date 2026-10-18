# study.py product roadmap

## Product goal
Build an IXL-inspired Python learning platform with a lesson wiki. Learners browse a curriculum, read documentation for each lesson, practice lesson-specific questions with feedback, and see lesson completion roll up into chapter completion percentages. Preserve the existing minimalist simulation visual language and saved progress wherever possible.

## Definition of done
- [ ] Every curriculum lesson has accurate, lesson-specific documentation and practical examples.
- [ ] Every lesson has a tested question bank with multiple variations, a reliable answer key, explanations, and boundary cases.
- [ ] A lesson is complete only after the learner meets its practice completion rule; reading alone does not imply mastery.
- [ ] Chapter completion is completed lessons / total lessons, shown as a percentage and a progress bar.
- [ ] Learner progress survives refreshes and app updates; invalid/stale local data is migrated or safely ignored.
- [ ] Curriculum and content have automated coverage checks; question generators have semantic tests, not only shape checks.
- [ ] CI tests, lint, type-check, and production build pass.
- [ ] Mobile layout and keyboard accessibility work for chapter navigation, wiki content, practice, and feedback.

## Milestones

### 0. Baseline and product scaffolding
- [x] Confirm repository and work on main directly; no draft branches.
- [x] Establish persistent product goals and acceptance criteria in this file.
- [ ] Record the latest verified CI/build state and resolve any active failures before feature expansion.

### 1. Curriculum wiki and progress model
- [ ] Move the curriculum into one canonical data module shared by the wiki, lesson practice, and chapter overview.
- [x] Add a searchable lesson wiki with documentation, examples, and curriculum source links.
- [x] Derive chapter percentages from per-lesson records; Print Output now records completion after practice.
- [ ] Preserve/migrate existing study-next-progress-v1 and study-next-progress-v2 data safely.

### 2. Lesson-specific practice
- [ ] Replace chapter-level fallback questions with lesson-specific question banks. (Vertical slice shipped for all four Print Output lessons.)
- [ ] Define a stable question contract: prompt, choices, correct answer, explanation, objective, difficulty, and deterministic variant seed.
- [x] Add deterministic Print Output question generation with automated answer-choice and reproducibility tests; expand semantic coverage as more lessons are added.
- [ ] Add enough variation to reduce repetition without treating random output as correctness evidence.

### 3. Mastery and learning loop
- [x] Set the first mastery rule: three consecutive correct answers for each Print Output lesson.
- [ ] Recommend lessons using prerequisite relationships and recent performance.
- [ ] Let learners retry, review explanations, and revisit completed lessons.
- [ ] Report progress honestly: distinguish read, practiced, and mastered states.

### 4. Product readiness
- [ ] Verify responsive layout, keyboard use, screen-reader feedback, empty states, and error recovery.
- [ ] Add telemetry only with a clear privacy policy and minimal data collection.
- [ ] Evaluate whether accounts/backend are needed; keep local-first until cross-device progress or shared data justifies a backend.
- [ ] Verify production build and deployed route after each meaningful milestone.

### Current vertical slice\n- [x] Print Output chapter: all four lessons have lesson-specific generated questions, explanations, verified answer keys, and local completion tracking.\n- [ ] Extend the same reusable pattern to the next chapter only after CI confirms this slice.\n\n## Engineering rules
1. Work directly on main as requested; do not create draft branches or PRs unless the user changes this instruction.
2. Inspect current repository state and CI before each batch.
3. Prefer small vertical slices that work end-to-end over broad, unverified scaffolding.
4. Do not claim a lesson has a real question bank unless the question is specific to that lesson and its answer is tested.
5. Do not claim build/deployment success without fresh evidence.
6. Update this roadmap after each verified milestone and state what remains unfinished.
