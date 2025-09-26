import React from 'react'
import { ClipboardList, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'

const SelfAssessment = () => {
  const [currentAssessment, setCurrentAssessment] = React.useState(null)
  const [currentQuestion, setCurrentQuestion] = React.useState(0)
  const [answers, setAnswers] = React.useState({})
  const [isCompleted, setIsCompleted] = React.useState(false)
  const [results, setResults] = React.useState(null)

  const assessments = [
    {
      id: 'anxiety',
      title: 'Anxiety Assessment (GAD-7)',
      description: 'Evaluate your anxiety levels using the clinically validated GAD-7 scale.',
      duration: '5-7 minutes',
      questions: [
        {
          id: 1,
          text: 'How often have you felt nervous, anxious, or on edge over the past two weeks?',
          options: [
            { value: 0, text: 'Not at all' },
            { value: 1, text: 'Several days' },
            { value: 2, text: 'More than half the days' },
            { value: 3, text: 'Nearly every day' }
          ]
        },
        {
          id: 2,
          text: 'How often have you not been able to stop or control worrying?',
          options: [
            { value: 0, text: 'Not at all' },
            { value: 1, text: 'Several days' },
            { value: 2, text: 'More than half the days' },
            { value: 3, text: 'Nearly every day' }
          ]
        },
        {
          id: 3,
          text: 'How often have you had trouble relaxing?',
          options: [
            { value: 0, text: 'Not at all' },
            { value: 1, text: 'Several days' },
            { value: 2, text: 'More than half the days' },
            { value: 3, text: 'Nearly every day' }
          ]
        },
        {
          id: 4,
          text: 'How often have you felt afraid that something awful might happen?',
          options: [
            { value: 0, text: 'Not at all' },
            { value: 1, text: 'Several days' },
            { value: 2, text: 'More than half the days' },
            { value: 3, text: 'Nearly every day' }
          ]
        },
        {
          id: 5,
          text: 'How often have you felt restless or being keyed up or on edge?',
          options: [
            { value: 0, text: 'Not at all' },
            { value: 1, text: 'Several days' },
            { value: 2, text: 'More than half the days' },
            { value: 3, text: 'Nearly every day' }
          ]
        },
        {
          id: 6,
          text: 'How often have you become easily annoyed or irritable?',
          options: [
            { value: 0, text: 'Not at all' },
            { value: 1, text: 'Several days' },
            { value: 2, text: 'More than half the days' },
            { value: 3, text: 'Nearly every day' }
          ]
        },
        {
          id: 7,
          text: 'How often have you felt afraid as if something awful might happen?',
          options: [
            { value: 0, text: 'Not at all' },
            { value: 1, text: 'Several days' },
            { value: 2, text: 'More than half the days' },
            { value: 3, text: 'Nearly every day' }
          ]
        }
      ]
    },
    {
      id: 'depression',
      title: 'Depression Assessment (PHQ-9)',
      description: 'Screen for depression symptoms using the clinically validated PHQ-9 questionnaire.',
      duration: '7-10 minutes',
      questions: [
        {
          id: 1,
          text: 'Little interest or pleasure in doing things',
          options: [
            { value: 0, text: 'Not at all' },
            { value: 1, text: 'Several days' },
            { value: 2, text: 'More than half the days' },
            { value: 3, text: 'Nearly every day' }
          ]
        },
        {
          id: 2,
          text: 'Feeling down, depressed, or hopeless',
          options: [
            { value: 0, text: 'Not at all' },
            { value: 1, text: 'Several days' },
            { value: 2, text: 'More than half the days' },
            { value: 3, text: 'Nearly every day' }
          ]
        },
        {
          id: 3,
          text: 'Trouble falling or staying asleep, or sleeping too much',
          options: [
            { value: 0, text: 'Not at all' },
            { value: 1, text: 'Several days' },
            { value: 2, text: 'More than half the days' },
            { value: 3, text: 'Nearly every day' }
          ]
        },
        {
          id: 4,
          text: 'Feeling tired or having little energy',
          options: [
            { value: 0, text: 'Not at all' },
            { value: 1, text: 'Several days' },
            { value: 2, text: 'More than half the days' },
            { value: 3, text: 'Nearly every day' }
          ]
        },
        {
          id: 5,
          text: 'Poor appetite or overeating',
          options: [
            { value: 0, text: 'Not at all' },
            { value: 1, text: 'Several days' },
            { value: 2, text: 'More than half the days' },
            { value: 3, text: 'Nearly every day' }
          ]
        },
        {
          id: 6,
          text: 'Feeling bad about yourself or that you are a failure or have let yourself or your family down',
          options: [
            { value: 0, text: 'Not at all' },
            { value: 1, text: 'Several days' },
            { value: 2, text: 'More than half the days' },
            { value: 3, text: 'Nearly every day' }
          ]
        },
        {
          id: 7,
          text: 'Trouble concentrating on things, such as reading the newspaper or watching television',
          options: [
            { value: 0, text: 'Not at all' },
            { value: 1, text: 'Several days' },
            { value: 2, text: 'More than half the days' },
            { value: 3, text: 'Nearly every day' }
          ]
        },
        {
          id: 8,
          text: 'Moving or speaking so slowly that other people could have noticed, or being so fidgety or restless that you have been moving around a lot more than usual',
          options: [
            { value: 0, text: 'Not at all' },
            { value: 1, text: 'Several days' },
            { value: 2, text: 'More than half the days' },
            { value: 3, text: 'Nearly every day' }
          ]
        },
        {
          id: 9,
          text: 'Thoughts that you would be better off dead, or thoughts of hurting yourself in some way',
          options: [
            { value: 0, text: 'Not at all' },
            { value: 1, text: 'Several days' },
            { value: 2, text: 'More than half the days' },
            { value: 3, text: 'Nearly every day' }
          ]
        }
      ]
    },
    {
      id: 'stress',
      title: 'Perceived Stress Scale',
      description: 'Understand your current stress levels and how unpredictable and uncontrollable you find your life.',
      duration: '8-10 minutes',
      questions: [
        {
          id: 1,
          text: 'In the last month, how often have you been upset because of something that happened unexpectedly?',
          options: [
            { value: 0, text: 'Never' },
            { value: 1, text: 'Almost never' },
            { value: 2, text: 'Sometimes' },
            { value: 3, text: 'Fairly often' },
            { value: 4, text: 'Very often' }
          ]
        },
        {
          id: 2,
          text: 'In the last month, how often have you felt that you were unable to control the important things in your life?',
          options: [
            { value: 0, text: 'Never' },
            { value: 1, text: 'Almost never' },
            { value: 2, text: 'Sometimes' },
            { value: 3, text: 'Fairly often' },
            { value: 4, text: 'Very often' }
          ]
        },
        {
          id: 3,
          text: 'In the last month, how often have you felt nervous and stressed?',
          options: [
            { value: 0, text: 'Never' },
            { value: 1, text: 'Almost never' },
            { value: 2, text: 'Sometimes' },
            { value: 3, text: 'Fairly often' },
            { value: 4, text: 'Very often' }
          ]
        },
        {
          id: 4,
          text: 'In the last month, how often have you felt confident about your ability to handle your personal problems?',
          options: [
            { value: 4, text: 'Never' },
            { value: 3, text: 'Almost never' },
            { value: 2, text: 'Sometimes' },
            { value: 1, text: 'Fairly often' },
            { value: 0, text: 'Very often' }
          ]
        },
        {
          id: 5,
          text: 'In the last month, how often have you felt that things were going your way?',
          options: [
            { value: 4, text: 'Never' },
            { value: 3, text: 'Almost never' },
            { value: 2, text: 'Sometimes' },
            { value: 1, text: 'Fairly often' },
            { value: 0, text: 'Very often' }
          ]
        },
        {
          id: 6,
          text: 'In the last month, how often have you found that you could not cope with all the things that you had to do?',
          options: [
            { value: 0, text: 'Never' },
            { value: 1, text: 'Almost never' },
            { value: 2, text: 'Sometimes' },
            { value: 3, text: 'Fairly often' },
            { value: 4, text: 'Very often' }
          ]
        },
        {
          id: 7,
          text: 'In the last month, how often have you been able to control irritations in your life?',
          options: [
            { value: 4, text: 'Never' },
            { value: 3, text: 'Almost never' },
            { value: 2, text: 'Sometimes' },
            { value: 1, text: 'Fairly often' },
            { value: 0, text: 'Very often' }
          ]
        },
        {
          id: 8,
          text: 'In the last month, how often have you felt that you were on top of things?',
          options: [
            { value: 4, text: 'Never' },
            { value: 3, text: 'Almost never' },
            { value: 2, text: 'Sometimes' },
            { value: 1, text: 'Fairly often' },
            { value: 0, text: 'Very often' }
          ]
        },
        {
          id: 9,
          text: 'In the last month, how often have you been angered because of things that happened that were outside of your control?',
          options: [
            { value: 0, text: 'Never' },
            { value: 1, text: 'Almost never' },
            { value: 2, text: 'Sometimes' },
            { value: 3, text: 'Fairly often' },
            { value: 4, text: 'Very often' }
          ]
        },
        {
          id: 10,
          text: 'In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?',
          options: [
            { value: 0, text: 'Never' },
            { value: 1, text: 'Almost never' },
            { value: 2, text: 'Sometimes' },
            { value: 3, text: 'Fairly often' },
            { value: 4, text: 'Very often' }
          ]
        }
      ]
    },
    {
      id: 'wellbeing',
      title: 'PERMA Wellbeing Assessment',
      description: 'Comprehensive wellbeing check based on Positive Psychology principles (Positive emotions, Engagement, Relationships, Meaning, Achievement).',
      duration: '10-12 minutes',
      questions: [
        {
          id: 1,
          text: 'How often do you experience positive emotions like joy, gratitude, serenity, interest, hope, pride, amusement, inspiration, awe, love?',
          options: [
            { value: 4, text: 'Very often' },
            { value: 3, text: 'Often' },
            { value: 2, text: 'Sometimes' },
            { value: 1, text: 'Rarely' },
            { value: 0, text: 'Never' }
          ]
        },
        {
          id: 2,
          text: 'How often do you become absorbed in what you are doing?',
          options: [
            { value: 4, text: 'Very often' },
            { value: 3, text: 'Often' },
            { value: 2, text: 'Sometimes' },
            { value: 1, text: 'Rarely' },
            { value: 0, text: 'Never' }
          ]
        },
        {
          id: 3,
          text: 'How satisfied are you with your personal relationships?',
          options: [
            { value: 4, text: 'Very satisfied' },
            { value: 3, text: 'Satisfied' },
            { value: 2, text: 'Neutral' },
            { value: 1, text: 'Dissatisfied' },
            { value: 0, text: 'Very dissatisfied' }
          ]
        },
        {
          id: 4,
          text: 'How often do you feel that your life has purpose and meaning?',
          options: [
            { value: 4, text: 'Very often' },
            { value: 3, text: 'Often' },
            { value: 2, text: 'Sometimes' },
            { value: 1, text: 'Rarely' },
            { value: 0, text: 'Never' }
          ]
        },
        {
          id: 5,
          text: 'How often do you achieve the important goals you have set for yourself?',
          options: [
            { value: 4, text: 'Very often' },
            { value: 3, text: 'Often' },
            { value: 2, text: 'Sometimes' },
            { value: 1, text: 'Rarely' },
            { value: 0, text: 'Never' }
          ]
        },
        {
          id: 6,
          text: 'Taking all things together, how happy would you say you are?',
          options: [
            { value: 4, text: 'Very happy' },
            { value: 3, text: 'Pretty happy' },
            { value: 2, text: 'Not too happy' },
            { value: 1, text: 'Unhappy' },
            { value: 0, text: 'Very unhappy' }
          ]
        },
        {
          id: 7,
          text: 'In general, how would you say your health is?',
          options: [
            { value: 4, text: 'Excellent' },
            { value: 3, text: 'Very good' },
            { value: 2, text: 'Good' },
            { value: 1, text: 'Fair' },
            { value: 0, text: 'Poor' }
          ]
        }
      ]
    },
    {
      id: 'sleep',
      title: 'Sleep Quality Assessment',
      description: 'Evaluate your sleep patterns and identify potential sleep disorders or issues.',
      duration: '6-8 minutes',
      questions: [
        {
          id: 1,
          text: 'How would you rate your sleep quality overall?',
          options: [
            { value: 4, text: 'Very good' },
            { value: 3, text: 'Fairly good' },
            { value: 2, text: 'Fairly bad' },
            { value: 1, text: 'Very bad' }
          ]
        },
        {
          id: 2,
          text: 'How long does it usually take you to fall asleep?',
          options: [
            { value: 4, text: 'Less than 15 minutes' },
            { value: 3, text: '16-30 minutes' },
            { value: 2, text: '31-60 minutes' },
            { value: 1, text: 'More than 60 minutes' }
          ]
        },
        {
          id: 3,
          text: 'How often do you wake up during the night?',
          options: [
            { value: 4, text: 'Never' },
            { value: 3, text: 'Less than once a week' },
            { value: 2, text: 'Once or twice a week' },
            { value: 1, text: 'Three or more times a week' }
          ]
        },
        {
          id: 4,
          text: 'How often do you wake up too early and cannot get back to sleep?',
          options: [
            { value: 4, text: 'Never' },
            { value: 3, text: 'Less than once a week' },
            { value: 2, text: 'Once or twice a week' },
            { value: 1, text: 'Three or more times a week' }
          ]
        },
        {
          id: 5,
          text: 'How rested do you feel when you wake up?',
          options: [
            { value: 4, text: 'Very rested' },
            { value: 3, text: 'Fairly rested' },
            { value: 2, text: 'Fairly tired' },
            { value: 1, text: 'Very tired' }
          ]
        },
        {
          id: 6,
          text: 'How often do you have trouble staying awake during the day?',
          options: [
            { value: 4, text: 'Never' },
            { value: 3, text: 'Less than once a week' },
            { value: 2, text: 'Once or twice a week' },
            { value: 1, text: 'Three or more times a week' }
          ]
        }
      ]
    },
    {
      id: 'burnout',
      title: 'Burnout Assessment',
      description: 'Assess your risk for burnout and identify symptoms of emotional, physical, and mental exhaustion.',
      duration: '8-10 minutes',
      questions: [
        {
          id: 1,
          text: 'I feel emotionally drained by my work/responsibilities',
          options: [
            { value: 0, text: 'Never' },
            { value: 1, text: 'A few times a year' },
            { value: 2, text: 'Once a month' },
            { value: 3, text: 'A few times a month' },
            { value: 4, text: 'Once a week' },
            { value: 5, text: 'A few times a week' },
            { value: 6, text: 'Every day' }
          ]
        },
        {
          id: 2,
          text: 'I feel used up at the end of the workday',
          options: [
            { value: 0, text: 'Never' },
            { value: 1, text: 'A few times a year' },
            { value: 2, text: 'Once a month' },
            { value: 3, text: 'A few times a month' },
            { value: 4, text: 'Once a week' },
            { value: 5, text: 'A few times a week' },
            { value: 6, text: 'Every day' }
          ]
        },
        {
          id: 3,
          text: 'Working with people all day is really a strain for me',
          options: [
            { value: 0, text: 'Never' },
            { value: 1, text: 'A few times a year' },
            { value: 2, text: 'Once a month' },
            { value: 3, text: 'A few times a month' },
            { value: 4, text: 'Once a week' },
            { value: 5, text: 'A few times a week' },
            { value: 6, text: 'Every day' }
          ]
        },
        {
          id: 4,
          text: 'I feel burned out from my work/responsibilities',
          options: [
            { value: 0, text: 'Never' },
            { value: 1, text: 'A few times a year' },
            { value: 2, text: 'Once a month' },
            { value: 3, text: 'A few times a month' },
            { value: 4, text: 'Once a week' },
            { value: 5, text: 'A few times a week' },
            { value: 6, text: 'Every day' }
          ]
        },
        {
          id: 5,
          text: 'I feel frustrated by my job/responsibilities',
          options: [
            { value: 0, text: 'Never' },
            { value: 1, text: 'A few times a year' },
            { value: 2, text: 'Once a month' },
            { value: 3, text: 'A few times a month' },
            { value: 4, text: 'Once a week' },
            { value: 5, text: 'A few times a week' },
            { value: 6, text: 'Every day' }
          ]
        },
        {
          id: 6,
          text: 'I feel I\'m working too hard',
          options: [
            { value: 0, text: 'Never' },
            { value: 1, text: 'A few times a year' },
            { value: 2, text: 'Once a month' },
            { value: 3, text: 'A few times a month' },
            { value: 4, text: 'Once a week' },
            { value: 5, text: 'A few times a week' },
            { value: 6, text: 'Every day' }
          ]
        },
        {
          id: 7,
          text: 'I don\'t really care what happens to some of the people around me',
          options: [
            { value: 0, text: 'Never' },
            { value: 1, text: 'A few times a year' },
            { value: 2, text: 'Once a month' },
            { value: 3, text: 'A few times a month' },
            { value: 4, text: 'Once a week' },
            { value: 5, text: 'A few times a week' },
            { value: 6, text: 'Every day' }
          ]
        }
      ]
    },
    {
      id: 'social-anxiety',
      title: 'Social Anxiety Assessment',
      description: 'Evaluate your comfort level in social situations and identify signs of social anxiety disorder.',
      duration: '6-8 minutes',
      questions: [
        {
          id: 1,
          text: 'I am afraid of people in authority',
          options: [
            { value: 0, text: 'Not at all' },
            { value: 1, text: 'A little bit' },
            { value: 2, text: 'Somewhat' },
            { value: 3, text: 'Very much' },
            { value: 4, text: 'Extremely' }
          ]
        },
        {
          id: 2,
          text: 'I am bothered by blushing in front of people',
          options: [
            { value: 0, text: 'Not at all' },
            { value: 1, text: 'A little bit' },
            { value: 2, text: 'Somewhat' },
            { value: 3, text: 'Very much' },
            { value: 4, text: 'Extremely' }
          ]
        },
        {
          id: 3,
          text: 'Parties and social events scare me',
          options: [
            { value: 0, text: 'Not at all' },
            { value: 1, text: 'A little bit' },
            { value: 2, text: 'Somewhat' },
            { value: 3, text: 'Very much' },
            { value: 4, text: 'Extremely' }
          ]
        },
        {
          id: 4,
          text: 'I avoid talking to people I don\'t know',
          options: [
            { value: 0, text: 'Not at all' },
            { value: 1, text: 'A little bit' },
            { value: 2, text: 'Somewhat' },
            { value: 3, text: 'Very much' },
            { value: 4, text: 'Extremely' }
          ]
        },
        {
          id: 5,
          text: 'Being criticized scares me a lot',
          options: [
            { value: 0, text: 'Not at all' },
            { value: 1, text: 'A little bit' },
            { value: 2, text: 'Somewhat' },
            { value: 3, text: 'Very much' },
            { value: 4, text: 'Extremely' }
          ]
        },
        {
          id: 6,
          text: 'I avoid doing things or speaking to people for fear of embarrassment',
          options: [
            { value: 0, text: 'Not at all' },
            { value: 1, text: 'A little bit' },
            { value: 2, text: 'Somewhat' },
            { value: 3, text: 'Very much' },
            { value: 4, text: 'Extremely' }
          ]
        },
        {
          id: 7,
          text: 'Sweating in front of people causes me distress',
          options: [
            { value: 0, text: 'Not at all' },
            { value: 1, text: 'A little bit' },
            { value: 2, text: 'Somewhat' },
            { value: 3, text: 'Very much' },
            { value: 4, text: 'Extremely' }
          ]
        }
      ]
    },
    {
      id: 'resilience',
      title: 'Resilience Assessment',
      description: 'Measure your ability to bounce back from adversity and cope with life challenges.',
      duration: '7-9 minutes',
      questions: [
        {
          id: 1,
          text: 'I am able to adapt when changes occur',
          options: [
            { value: 4, text: 'Strongly agree' },
            { value: 3, text: 'Agree' },
            { value: 2, text: 'Neither agree nor disagree' },
            { value: 1, text: 'Disagree' },
            { value: 0, text: 'Strongly disagree' }
          ]
        },
        {
          id: 2,
          text: 'I can deal with whatever comes my way',
          options: [
            { value: 4, text: 'Strongly agree' },
            { value: 3, text: 'Agree' },
            { value: 2, text: 'Neither agree nor disagree' },
            { value: 1, text: 'Disagree' },
            { value: 0, text: 'Strongly disagree' }
          ]
        },
        {
          id: 3,
          text: 'I try to see the humorous side of things when I am faced with problems',
          options: [
            { value: 4, text: 'Strongly agree' },
            { value: 3, text: 'Agree' },
            { value: 2, text: 'Neither agree nor disagree' },
            { value: 1, text: 'Disagree' },
            { value: 0, text: 'Strongly disagree' }
          ]
        },
        {
          id: 4,
          text: 'Having to cope with stress can make me stronger',
          options: [
            { value: 4, text: 'Strongly agree' },
            { value: 3, text: 'Agree' },
            { value: 2, text: 'Neither agree nor disagree' },
            { value: 1, text: 'Disagree' },
            { value: 0, text: 'Strongly disagree' }
          ]
        },
        {
          id: 5,
          text: 'I tend to bounce back after illness, injury, or other hardships',
          options: [
            { value: 4, text: 'Strongly agree' },
            { value: 3, text: 'Agree' },
            { value: 2, text: 'Neither agree nor disagree' },
            { value: 1, text: 'Disagree' },
            { value: 0, text: 'Strongly disagree' }
          ]
        },
        {
          id: 6,
          text: 'I believe I can achieve my goals, even if there are obstacles',
          options: [
            { value: 4, text: 'Strongly agree' },
            { value: 3, text: 'Agree' },
            { value: 2, text: 'Neither agree nor disagree' },
            { value: 1, text: 'Disagree' },
            { value: 0, text: 'Strongly disagree' }
          ]
        },
        {
          id: 7,
          text: 'Under pressure, I stay focused and think clearly',
          options: [
            { value: 4, text: 'Strongly agree' },
            { value: 3, text: 'Agree' },
            { value: 2, text: 'Neither agree nor disagree' },
            { value: 1, text: 'Disagree' },
            { value: 0, text: 'Strongly disagree' }
          ]
        },
        {
          id: 8,
          text: 'I am not easily discouraged by failure',
          options: [
            { value: 4, text: 'Strongly agree' },
            { value: 3, text: 'Agree' },
            { value: 2, text: 'Neither agree nor disagree' },
            { value: 1, text: 'Disagree' },
            { value: 0, text: 'Strongly disagree' }
          ]
        }
      ]
    }
  ]

  const startAssessment = (assessment) => {
    setCurrentAssessment(assessment)
    setCurrentQuestion(0)
    setAnswers({})
    setIsCompleted(false)
    setResults(null)
  }

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < currentAssessment.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      completeAssessment()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const completeAssessment = () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0)
    let maxScore, percentage, level, message, recommendations

    switch (currentAssessment.id) {
      case 'anxiety':
        maxScore = 21 // GAD-7 max score
        if (totalScore <= 4) {
          level = 'Minimal'
          message = 'Your anxiety levels appear to be minimal.'
          recommendations = ['Continue your current self-care practices', 'Practice mindfulness regularly', 'Maintain healthy lifestyle habits']
        } else if (totalScore <= 9) {
          level = 'Mild'
          message = 'You may be experiencing mild anxiety.'
          recommendations = ['Try relaxation techniques', 'Practice deep breathing exercises', 'Maintain regular sleep schedule', 'Consider mindfulness meditation']
        } else if (totalScore <= 14) {
          level = 'Moderate'
          message = 'You may be experiencing moderate anxiety.'
          recommendations = ['Consider speaking with a counselor', 'Learn stress management techniques', 'Limit caffeine intake', 'Regular exercise can help']
        } else {
          level = 'Severe'
          message = 'You may be experiencing severe anxiety.'
          recommendations = ['Strongly consider professional mental health support', 'Practice grounding techniques', 'Avoid alcohol and excessive caffeine', 'Reach out to trusted friends or family']
        }
        break

      case 'depression':
        maxScore = 27 // PHQ-9 max score
        if (totalScore <= 4) {
          level = 'Minimal'
          message = 'Your depression symptoms appear to be minimal.'
          recommendations = ['Maintain healthy social connections', 'Continue regular physical activity', 'Practice gratitude daily']
        } else if (totalScore <= 9) {
          level = 'Mild'
          message = 'You may be experiencing mild depression symptoms.'
          recommendations = ['Increase physical activity', 'Connect with supportive people', 'Establish daily routines', 'Consider counseling']
        } else if (totalScore <= 14) {
          level = 'Moderate'
          message = 'You may be experiencing moderate depression.'
          recommendations = ['Seek professional counseling', 'Consider therapy options', 'Maintain social connections', 'Focus on sleep hygiene']
        } else if (totalScore <= 19) {
          level = 'Moderately Severe'
          message = 'You may be experiencing moderately severe depression.'
          recommendations = ['Strongly consider professional treatment', 'Contact a mental health provider', 'Reach out to crisis support if needed', 'Don\'t isolate yourself']
        } else {
          level = 'Severe'
          message = 'You may be experiencing severe depression.'
          recommendations = ['Seek immediate professional help', 'Contact crisis support services', 'Reach out to trusted individuals', 'Consider emergency services if having thoughts of self-harm']
        }
        break

      case 'stress':
        maxScore = 40 // PSS-10 max score
        if (totalScore <= 13) {
          level = 'Low'
          message = 'Your stress levels appear to be low and manageable.'
          recommendations = ['Keep up your current coping strategies', 'Maintain work-life balance', 'Continue healthy habits']
        } else if (totalScore <= 26) {
          level = 'Moderate'
          message = 'You may be experiencing moderate stress.'
          recommendations = ['Practice time management', 'Try stress-reduction techniques', 'Take regular breaks', 'Consider meditation or yoga']
        } else {
          level = 'High'
          message = 'You may be experiencing high stress levels.'
          recommendations = ['Consider stress management counseling', 'Prioritize self-care activities', 'Evaluate your workload', 'Learn relaxation techniques']
        }
        break

      case 'wellbeing':
        maxScore = 28 // PERMA assessment max score
        percentage = (totalScore / maxScore) * 100
        if (percentage >= 75) {
          level = 'Flourishing'
          message = 'Your overall wellbeing appears to be excellent.'
          recommendations = ['Continue your positive habits', 'Share your strategies with others', 'Consider helping others in their wellness journey']
        } else if (percentage >= 60) {
          level = 'Good'
          message = 'Your wellbeing is generally positive.'
          recommendations = ['Focus on areas for growth', 'Strengthen social connections', 'Pursue meaningful activities']
        } else if (percentage >= 45) {
          level = 'Moderate'
          message = 'Your wellbeing could benefit from some attention.'
          recommendations = ['Focus on activities that bring joy', 'Connect with supportive people', 'Establish healthy routines', 'Practice gratitude']
        } else {
          level = 'Needs Attention'
          message = 'Your wellbeing may need focused care and support.'
          recommendations = ['Consider professional support', 'Prioritize self-care', 'Reach out to trusted friends or family', 'Focus on basic needs first']
        }
        break

      case 'sleep':
        maxScore = 24 // Sleep Quality max score
        percentage = (totalScore / maxScore) * 100
        if (percentage >= 75) {
          level = 'Excellent'
          message = 'Your sleep quality is excellent.'
          recommendations = ['Maintain your current sleep habits', 'Continue good sleep hygiene', 'Share tips with others']
        } else if (percentage >= 60) {
          level = 'Good'
          message = 'Your sleep quality is generally good.'
          recommendations = ['Fine-tune your bedtime routine', 'Maintain consistent sleep schedule', 'Optimize sleep environment']
        } else if (percentage >= 45) {
          level = 'Fair'
          message = 'Your sleep quality could be improved.'
          recommendations = ['Establish consistent bedtime routine', 'Limit screen time before bed', 'Create comfortable sleep environment', 'Avoid caffeine late in day']
        } else {
          level = 'Poor'
          message = 'Your sleep quality needs significant attention.'
          recommendations = ['Consult healthcare provider about sleep', 'Consider sleep hygiene education', 'Evaluate for sleep disorders', 'Address stress and anxiety']
        }
        break

      case 'burnout':
        maxScore = 42 // Burnout assessment max score
        if (totalScore <= 14) {
          level = 'Low Risk'
          message = 'Your burnout risk appears to be low.'
          recommendations = ['Maintain work-life balance', 'Continue current coping strategies', 'Stay aware of stress levels']
        } else if (totalScore <= 28) {
          level = 'Moderate Risk'
          message = 'You may be at moderate risk for burnout.'
          recommendations = ['Take regular breaks', 'Set boundaries at work', 'Practice stress management', 'Consider workload evaluation']
        } else {
          level = 'High Risk'
          message = 'You may be at high risk for burnout.'
          recommendations = ['Consider professional counseling', 'Evaluate work situation', 'Take time off if possible', 'Prioritize self-care and recovery']
        }
        break

      case 'social-anxiety':
        maxScore = 28 // Social Anxiety max score
        if (totalScore <= 7) {
          level = 'Minimal'
          message = 'Your social anxiety levels appear to be minimal.'
          recommendations = ['Continue healthy social practices', 'Maintain current confidence levels', 'Practice social skills when comfortable']
        } else if (totalScore <= 14) {
          level = 'Mild'
          message = 'You may experience mild social anxiety.'
          recommendations = ['Practice gradual exposure to social situations', 'Use relaxation techniques', 'Build confidence through small successes']
        } else if (totalScore <= 21) {
          level = 'Moderate'
          message = 'You may be experiencing moderate social anxiety.'
          recommendations = ['Consider anxiety management techniques', 'Practice social skills in safe environments', 'Seek support from trusted friends']
        } else {
          level = 'Severe'
          message = 'You may be experiencing severe social anxiety.'
          recommendations = ['Consider professional therapy', 'Look into social anxiety treatment options', 'Join support groups', 'Practice self-compassion']
        }
        break

      case 'resilience':
        maxScore = 32 // Resilience assessment max score
        percentage = (totalScore / maxScore) * 100
        if (percentage >= 75) {
          level = 'High'
          message = 'You show high resilience and coping abilities.'
          recommendations = ['Continue building on your strengths', 'Help others develop resilience', 'Maintain support networks']
        } else if (percentage >= 60) {
          level = 'Moderate-High'
          message = 'You have good resilience with room for growth.'
          recommendations = ['Develop additional coping strategies', 'Practice stress management', 'Build stronger support networks']
        } else if (percentage >= 45) {
          level = 'Moderate'
          message = 'Your resilience could benefit from development.'
          recommendations = ['Practice problem-solving skills', 'Build social connections', 'Develop stress management techniques', 'Focus on personal strengths']
        } else {
          level = 'Low'
          message = 'Your resilience may need focused development.'
          recommendations = ['Consider resilience training', 'Seek support from counselors', 'Work on building coping skills', 'Start with small challenges']
        }
        break

      default:
        maxScore = currentAssessment.questions.length * 4
        percentage = (totalScore / maxScore) * 100
        if (percentage >= 75) {
          level = 'Good'
          message = 'Your assessment results look positive.'
          recommendations = ['Continue current positive practices']
        } else if (percentage >= 50) {
          level = 'Moderate'
          message = 'There are areas for improvement.'
          recommendations = ['Focus on areas that need attention']
        } else {
          level = 'Needs Attention'
          message = 'Consider seeking support.'
          recommendations = ['Consider professional guidance']
        }
        break
    }

    if (!percentage) {
      percentage = (totalScore / maxScore) * 100
    }

    setResults({
      score: totalScore,
      maxScore,
      percentage: Math.round(percentage),
      level,
      message,
      recommendations
    })
    setIsCompleted(true)

    // Save results to localStorage
    const savedResults = JSON.parse(localStorage.getItem('zenzone-assessment-results') || '[]')
    savedResults.push({
      assessmentId: currentAssessment.id,
      title: currentAssessment.title,
      results: { score: totalScore, maxScore, percentage: Math.round(percentage), level },
      completedAt: new Date().toISOString()
    })
    localStorage.setItem('zenzone-assessment-results', JSON.stringify(savedResults))
  }

  const resetAssessment = () => {
    setCurrentAssessment(null)
    setCurrentQuestion(0)
    setAnswers({})
    setIsCompleted(false)
    setResults(null)
  }

  if (currentAssessment && !isCompleted) {
    const question = currentAssessment.questions[currentQuestion]
    const progress = ((currentQuestion + 1) / currentAssessment.questions.length) * 100

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentAssessment.title}
            </h1>
            <button
              onClick={resetAssessment}
              className="btn-secondary text-sm"
            >
              Exit
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
            <div
              className="bg-zen-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Question {currentQuestion + 1} of {currentAssessment.questions.length}
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {question.text}
          </h2>

          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(question.id, option.value)}
                className={`
                  w-full text-left p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md
                  ${answers[question.id] === option.value
                    ? 'border-zen-500 bg-zen-50 dark:bg-zen-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-zen-300 dark:hover:border-zen-600'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-4 h-4 rounded-full border-2 transition-colors duration-200
                    ${answers[question.id] === option.value
                      ? 'border-zen-500 bg-zen-500'
                      : 'border-gray-300 dark:border-gray-600'
                    }
                  `}>
                    {answers[question.id] === option.value && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <span className="text-gray-900 dark:text-white">{option.text}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={nextQuestion}
              disabled={answers[question.id] === undefined}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <span>{currentQuestion === currentAssessment.questions.length - 1 ? 'Complete' : 'Next'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isCompleted && results) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-zen-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Assessment Complete
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here are your personalized results and recommendations.
          </p>
        </div>

        <div className="space-y-6">
          {/* Results Summary */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Your Results
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-2xl font-bold text-zen-600 dark:text-zen-400">
                  {results.score}/{results.maxScore}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Score</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-2xl font-bold text-zen-600 dark:text-zen-400">
                  {results.percentage}%
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Percentage</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-2xl font-bold text-zen-600 dark:text-zen-400">
                  {results.level}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Level</p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {results.message}
            </p>
          </div>

          {/* Recommendations */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Personalized Recommendations
            </h3>
            <ul className="space-y-2">
              {results.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-zen-600 dark:text-zen-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={resetAssessment}
              className="btn-primary flex-1"
            >
              Take Another Assessment
            </button>
            <button
              onClick={() => window.print()}
              className="btn-secondary flex-1"
            >
              Save Results
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Self-Assessment Tools
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Take scientifically-backed assessments to better understand your mental wellness.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessments.map(assessment => (
          <div key={assessment.id} className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start space-x-3 mb-4">
              <div className="p-2 bg-zen-100 dark:bg-zen-900 rounded-lg">
                <ClipboardList className="h-6 w-6 text-zen-600 dark:text-zen-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {assessment.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {assessment.duration}
                </p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {assessment.description}
            </p>

            <button
              onClick={() => startAssessment(assessment)}
              className="w-full btn-primary flex items-center justify-center space-x-2 group"
            >
              <span>Start Assessment</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-12 card bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
        <div className="flex items-start space-x-3">
          <div className="p-1 bg-yellow-200 dark:bg-yellow-800 rounded-full">
            <ClipboardList className="h-4 w-4 text-yellow-700 dark:text-yellow-300" />
          </div>
          <div>
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
              Important Note
            </h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              These assessments are for educational purposes only and are not a substitute for professional medical advice, 
              diagnosis, or treatment. If you're experiencing severe symptoms or thoughts of self-harm, please seek immediate 
              professional help or contact a crisis helpline.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelfAssessment