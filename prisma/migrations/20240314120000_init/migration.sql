-- CreateTable
CREATE TABLE "Candidate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "skills" TEXT NOT NULL,
    "experienceYears" INTEGER NOT NULL DEFAULT 0,
    "location" TEXT,
    "education" TEXT,
    "resumeText" TEXT NOT NULL,
    "pipelineStatus" TEXT NOT NULL DEFAULT 'Applied',
    "linkedin" TEXT,
    "github" TEXT,
    "portfolio" TEXT,
    "website" TEXT,
    "twitter" TEXT,
    "summary" TEXT,
    "candidateScore" INTEGER NOT NULL DEFAULT 0,
    "rating" INTEGER,
    "employmentHistory" TEXT,
    "certifications" TEXT,
    "languages" TEXT,
    "salaryExpectation" INTEGER,
    "availability" TEXT NOT NULL DEFAULT 'Available',
    "interviewNotes" TEXT,
    "feedback" TEXT,
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_email_key" ON "Candidate"("email");