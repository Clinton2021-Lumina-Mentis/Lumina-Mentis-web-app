const FALLBACK_TEXT_MIN_LENGTH = 160;

function normalizeKey(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

const fallbackBySlug = {
  'major-depression': {
    overview:
      'Major depressive disorder is more than temporary sadness. It is a sustained change in mood, motivation, energy, sleep, appetite, concentration, and self-worth that can make normal routines feel unusually difficult. Depression often develops from several overlapping factors at once: inherited vulnerability, changes in stress systems, life events, medical conditions, and learned patterns of thought or withdrawal. With the right mix of support, therapy, medication when appropriate, and daily stabilization strategies, many people improve significantly.',
    who_is_affected:
      'Depression can affect people of any age, background, or personality type. Risk increases when someone has a family history of mood disorders, previous episodes of depression, chronic stress, trauma, social isolation, substance use, chronic pain, sleep disruption, or major hormonal or medical changes. Some people become depressed after a clear loss or stressor, while others experience symptoms without an obvious external trigger because biological sensitivity and accumulated stress can reach a threshold gradually.',
    neurochemistry:
      'Depression is associated with changes across several brain networks rather than a single chemical imbalance. Serotonin, norepinephrine, dopamine, glutamate, cortisol, inflammatory signaling, and circadian rhythm systems can all influence mood and energy. Brain areas involved in threat detection, reward, memory, and executive control may become less balanced: negative information can feel more prominent, reward can feel muted, and planning can require more effort. These patterns are changeable, which is one reason treatment and consistent routines can help.',
    biological_causes: [
      'Family history and genetic loading can increase sensitivity to mood episodes, especially when combined with stress.',
      'Sleep and circadian rhythm disruption can reduce emotional regulation and make depressive symptoms harder to recover from.',
      'Medical conditions such as thyroid disease, chronic pain, inflammatory illness, anemia, and some medications can contribute to depressive symptoms.',
      'Hormonal changes around puberty, postpartum periods, perimenopause, or endocrine illness may shift mood regulation.'
    ],
    environmental_causes: [
      'Bereavement, relationship loss, job loss, housing instability, discrimination, or financial pressure can overwhelm coping resources.',
      'Ongoing conflict, caregiving burden, unsafe environments, or loneliness can keep the nervous system in a prolonged stress state.',
      'Early adversity or trauma can shape stress responses and beliefs about safety, control, and self-worth.'
    ],
    psychological_causes: [
      'Rumination can repeatedly reactivate painful thoughts and make problems feel less solvable.',
      'Avoidance and withdrawal can temporarily reduce effort but also remove sources of reward, connection, and mastery.',
      'Perfectionism, harsh self-criticism, hopeless predictions, and all-or-nothing thinking can intensify low mood.'
    ],
    lifestyle_causes: [
      'Irregular sleep, low daylight exposure, inactivity, and inconsistent meals can worsen energy and concentration.',
      'Alcohol or other substances may numb distress briefly while disrupting sleep, motivation, and mood stability.',
      'Too little social contact or too few meaningful activities can reduce the positive reinforcement that helps mood recover.'
    ],
    symptoms: [
      {
        name: 'Persistently low mood',
        severity: 'moderate',
        description: 'Feeling sad, empty, numb, tearful, or emotionally heavy most of the day.',
        why_it_occurs: 'Mood networks can become biased toward threat, loss, and negative memory while stress chemistry remains elevated.'
      },
      {
        name: 'Loss of interest or pleasure',
        severity: 'moderate',
        description: 'Activities that used to feel meaningful or enjoyable may feel flat, effortful, or pointless.',
        why_it_occurs: 'Reward pathways involving dopamine and motivation can become less responsive, making positive experiences harder to anticipate or feel.'
      },
      {
        name: 'Fatigue and slowed activity',
        severity: 'moderate',
        description: 'Tasks may require unusual effort, and thinking or movement can feel slower than usual.',
        why_it_occurs: 'Sleep disruption, stress hormones, inflammation, and reduced reward signaling can all reduce available energy.'
      },
      {
        name: 'Concentration and decision difficulty',
        severity: 'moderate',
        description: 'Reading, planning, remembering, or choosing between options can become harder.',
        why_it_occurs: 'Depression can tax executive-control networks and keep attention pulled toward worry, self-criticism, or fatigue.'
      },
      {
        name: 'Thoughts of death or self-harm',
        severity: 'severe',
        description: 'Some people experience passive wishes not to wake up or active thoughts about harming themselves.',
        why_it_occurs: 'Hopelessness and emotional pain can narrow perceived options. This symptom deserves immediate support from a trusted person, crisis line, or emergency service.'
      }
    ],
    medications: [
      {
        name: 'SSRIs',
        type: 'Antidepressant',
        mechanism: 'Increase serotonin signaling over time and may help mood, anxiety, rumination, and emotional reactivity.',
        best_for: 'Many first-line cases of depression, especially with anxiety or intrusive negative thoughts.',
        common_side_effects: ['nausea', 'headache', 'sleep changes', 'sexual side effects']
      },
      {
        name: 'SNRIs',
        type: 'Antidepressant',
        mechanism: 'Influence serotonin and norepinephrine pathways involved in mood, energy, pain, and attention.',
        best_for: 'Depression with fatigue, anxiety, or some chronic pain symptoms.',
        common_side_effects: ['nausea', 'sweating', 'blood pressure changes', 'sleep changes']
      },
      {
        name: 'Bupropion',
        type: 'Norepinephrine-dopamine reuptake inhibitor',
        mechanism: 'Acts on norepinephrine and dopamine pathways tied to motivation, energy, and reward.',
        best_for: 'Depression with low energy or concentration when clinically appropriate.',
        common_side_effects: ['dry mouth', 'insomnia', 'anxiety', 'appetite changes']
      }
    ],
    lifestyle_remedies: [
      'Behavioral activation: schedule small, specific activities that create mastery, connection, or pleasure even before motivation returns.',
      'Keep sleep and wake times as consistent as possible, and seek morning daylight to support circadian rhythm.',
      'Use gentle movement, such as walking or stretching, as a mood intervention rather than a performance goal.',
      'Reduce isolation by choosing one low-pressure contact point: a text, brief call, support group, or shared routine.',
      'Pair therapy skills with daily tracking to notice early warning signs and patterns that affect mood.'
    ],
    prognosis:
      'Depression is common and treatable, but recovery is usually a process rather than a switch. Many people improve with psychotherapy, medication, lifestyle stabilization, social support, or a combination. Recurrent episodes are possible, so relapse prevention matters: sleep routines, early support, realistic workload, crisis planning, and maintenance treatment when recommended can reduce risk. Immediate help is important if symptoms include suicidal thoughts, inability to function, psychosis, or severe self-neglect.',
    prevalence: 'Affects roughly 5% of adults worldwide in a given year, with lifetime risk varying by population.',
    related_disorders: ['Persistent Depressive Disorder', 'Bipolar Disorder', 'Generalized Anxiety Disorder', 'Post-Traumatic Stress Disorder']
  },
  'generalized-anxiety': {
    overview:
      'Generalized anxiety disorder involves persistent, hard-to-control worry that spreads across several parts of life such as health, work, relationships, finances, safety, or everyday responsibilities. The worry is often accompanied by physical tension, restlessness, fatigue, irritability, sleep disruption, and difficulty concentrating. GAD is not simply "overthinking"; it reflects a nervous system and attention system that repeatedly scans for possible threat and struggles to return to a calmer baseline.',
    who_is_affected:
      'GAD can affect children, adolescents, and adults. Risk is higher for people with a family history of anxiety, inhibited temperament, chronic uncertainty, trauma, perfectionistic standards, high responsibility roles, or medical conditions that create bodily sensations similar to anxiety. Some people learn worry as a problem-solving strategy because it briefly creates a sense of control, even though it keeps the alarm system active over time.',
    neurochemistry:
      'Anxiety involves interactions between threat-detection circuits, the prefrontal cortex, autonomic arousal, and neurotransmitters such as serotonin, norepinephrine, GABA, glutamate, and dopamine. In GAD, the brain can overestimate uncertainty and underestimate coping ability. The body may remain ready for action through muscle tension, faster heart rate, shallow breathing, and stress-hormone release even when there is no immediate danger.',
    biological_causes: [
      'Inherited sensitivity in threat detection and stress response can make anxiety easier to trigger.',
      'Autonomic nervous system reactivity can create strong physical sensations that reinforce worry.',
      'Sleep deprivation and stimulant sensitivity can increase arousal and reduce emotional regulation.',
      'Medical issues such as thyroid disease, arrhythmias, respiratory conditions, or medication effects can mimic or worsen anxiety.'
    ],
    environmental_causes: [
      'Unpredictable caregiving, instability, bullying, trauma, or repeated criticism can teach the brain to stay vigilant.',
      'High-pressure responsibilities, financial strain, caregiving, or work uncertainty can keep worry loops active.',
      'Constant news, notifications, and social comparison can increase perceived threat and reduce mental recovery time.'
    ],
    psychological_causes: [
      'Intolerance of uncertainty can make unanswered questions feel urgent or unsafe.',
      'Catastrophic predictions can turn low-probability outcomes into emotionally convincing possibilities.',
      'Reassurance seeking and checking can reduce anxiety briefly but train the brain to need repeated certainty.',
      'Perfectionism can make ordinary mistakes feel dangerous or unacceptable.'
    ],
    lifestyle_causes: [
      'Too much caffeine, irregular meals, or dehydration can amplify body sensations associated with anxiety.',
      'Avoidance of feared tasks or conversations prevents the brain from learning that distress can pass safely.',
      'Overpacked schedules leave little room for recovery and keep the body in a high-alert mode.'
    ],
    symptoms: [
      {
        name: 'Excessive worry',
        severity: 'moderate',
        description: 'Frequent worry across multiple topics that feels difficult to stop or postpone.',
        why_it_occurs: 'The mind tries to reduce uncertainty by mentally rehearsing threats, but the rehearsal keeps threat circuits activated.'
      },
      {
        name: 'Restlessness or feeling keyed up',
        severity: 'moderate',
        description: 'A sense of being unable to settle, relax, or feel fully at ease.',
        why_it_occurs: 'The sympathetic nervous system remains prepared for action, even when no immediate action is needed.'
      },
      {
        name: 'Muscle tension',
        severity: 'moderate',
        description: 'Tight jaw, shoulders, chest, stomach, back, or headaches related to chronic tension.',
        why_it_occurs: 'The body prepares for protection by bracing muscles during repeated alarm states.'
      },
      {
        name: 'Sleep disturbance',
        severity: 'moderate',
        description: 'Trouble falling asleep, staying asleep, or waking unrefreshed because thoughts remain active.',
        why_it_occurs: 'Worry and arousal interfere with the downshift required for sleep.'
      },
      {
        name: 'Difficulty concentrating',
        severity: 'mild',
        description: 'Attention drifts toward possible problems, making work, reading, or conversation harder.',
        why_it_occurs: 'Threat monitoring competes with working memory and executive attention.'
      }
    ],
    medications: [
      {
        name: 'SSRIs',
        type: 'Antidepressant/anxiolytic',
        mechanism: 'Support serotonin signaling and can reduce worry intensity and physical anxiety over time.',
        best_for: 'First-line medication treatment for many people with persistent anxiety.',
        common_side_effects: ['nausea', 'sleep changes', 'headache', 'sexual side effects']
      },
      {
        name: 'SNRIs',
        type: 'Antidepressant/anxiolytic',
        mechanism: 'Influence serotonin and norepinephrine systems related to mood, arousal, and attention.',
        best_for: 'Anxiety with depressive symptoms, fatigue, or pain overlap when clinically appropriate.',
        common_side_effects: ['nausea', 'sweating', 'blood pressure changes', 'sleep changes']
      },
      {
        name: 'Buspirone',
        type: 'Anxiolytic',
        mechanism: 'Modulates serotonin receptors and may reduce generalized worry without sedating effects for many people.',
        best_for: 'Generalized anxiety, especially when sedation or dependence risk is a concern.',
        common_side_effects: ['dizziness', 'nausea', 'headache']
      }
    ],
    lifestyle_remedies: [
      'Practice scheduled worry time: write worries down and return to them during a limited daily window.',
      'Use gradual exposure to avoided tasks so the brain learns that uncertainty and discomfort can be tolerated.',
      'Reduce caffeine or other stimulants if they intensify anxiety sensations.',
      'Use slow breathing, progressive muscle relaxation, or grounding to teach the body a recovery response.',
      'Build problem-solving rules: separate solvable problems from hypothetical worries before taking action.'
    ],
    prognosis:
      'GAD often improves with cognitive behavioral therapy, exposure-based approaches, mindfulness and acceptance skills, medication when appropriate, and lifestyle changes that reduce chronic arousal. Because worry can become a long-standing habit, progress often means shorter worry loops, faster recovery, and more willingness to act without perfect certainty. Relapse prevention focuses on sleep, stress load, reducing avoidance, and catching reassurance or checking cycles early.',
    prevalence: 'Often estimated around 3% of adults in a given year, with higher lifetime rates.',
    related_disorders: ['Panic Disorder', 'Social Anxiety Disorder', 'Major Depressive Disorder', 'Obsessive-Compulsive Disorder']
  },
  schizophrenia: {
    overview:
      'Schizophrenia is a psychotic-spectrum disorder that can affect perception, beliefs, thought organization, motivation, emotion, and daily functioning. It may involve hallucinations, delusions, disorganized speech or behavior, reduced emotional expression, social withdrawal, and cognitive difficulties. The condition varies widely: some people have episodic symptoms with substantial recovery, while others need long-term support. Early treatment, stable relationships, medication planning, and practical supports can greatly improve outcomes.',
    who_is_affected:
      'Schizophrenia usually begins in late adolescence through early adulthood, though timing varies. Risk is influenced by genetic vulnerability, prenatal or early developmental stressors, cannabis or substance exposure in vulnerable individuals, trauma, urban stress, migration-related adversity, and sleep disruption. Having risk factors does not mean someone will develop schizophrenia; most people with a family history or stress exposure do not. The condition typically emerges when biological vulnerability and environmental stress cross a threshold.',
    neurochemistry:
      'Schizophrenia involves changes in dopamine signaling, especially in pathways tied to salience - the process of deciding what feels important. When salience signals become dysregulated, neutral events may feel unusually meaningful or threatening. Glutamate, GABA, inflammation, stress hormones, and brain connectivity also appear to play roles. Cognitive and negative symptoms may involve networks for working memory, reward, social cognition, and executive control, not only hallucinations or delusions.',
    biological_causes: [
      'Genetic vulnerability can increase risk, especially when several small-risk variants combine with environmental stress.',
      'Differences in dopamine, glutamate, and GABA signaling can affect perception, salience, attention, and thought organization.',
      'Prenatal infection, obstetric complications, or early neurodevelopmental disruption may increase vulnerability for some people.',
      'Sleep deprivation and circadian disruption can worsen psychosis risk and symptom intensity.'
    ],
    environmental_causes: [
      'High stress, trauma, social defeat, discrimination, or isolation can increase symptom risk in vulnerable people.',
      'Cannabis with high THC content, stimulants, and other substances can trigger or worsen psychosis in some individuals.',
      'Chaotic environments, unstable housing, or family conflict can make relapse prevention harder.'
    ],
    psychological_causes: [
      'Threat-based interpretations can develop when unusual perceptions or thoughts feel frightening and unexplained.',
      'Stigma and self-stigma can reduce help-seeking, increase isolation, and worsen depression or anxiety.',
      'Cognitive overload can make it harder to organize information, test beliefs, or follow conversations under stress.'
    ],
    lifestyle_causes: [
      'Stopping medication suddenly without clinical guidance can raise relapse risk for many people.',
      'Irregular sleep, high stress, and substance use can destabilize symptoms.',
      'Limited routine, loneliness, and lack of meaningful activity can worsen negative symptoms and functioning.'
    ],
    symptoms: [
      {
        name: 'Hallucinations',
        severity: 'severe',
        description: 'Hearing, seeing, or sensing things that others do not perceive, most commonly voices.',
        why_it_occurs: 'Perception and salience networks may generate or assign importance to internal experiences as if they came from outside.'
      },
      {
        name: 'Delusions',
        severity: 'severe',
        description: 'Strong beliefs that are not shared by others and remain fixed despite contrary evidence.',
        why_it_occurs: 'The brain may try to explain unusual sensations, coincidences, or threat feelings by forming a belief that organizes them.'
      },
      {
        name: 'Disorganized thinking or speech',
        severity: 'moderate',
        description: 'Speech may become hard to follow, tangential, or loosely connected.',
        why_it_occurs: 'Executive-control and language networks can struggle to sequence thoughts under cognitive load.'
      },
      {
        name: 'Negative symptoms',
        severity: 'moderate',
        description: 'Reduced motivation, emotional expression, speech, pleasure, or social engagement.',
        why_it_occurs: 'Reward, planning, and social cognition networks may become less responsive, and symptoms can be worsened by depression, stigma, or medication side effects.'
      },
      {
        name: 'Cognitive difficulties',
        severity: 'moderate',
        description: 'Problems with attention, memory, planning, processing speed, or flexible thinking.',
        why_it_occurs: 'Schizophrenia can affect the brain systems that coordinate working memory, attention, and goal-directed behavior.'
      }
    ],
    medications: [
      {
        name: 'Second-generation antipsychotics',
        type: 'Antipsychotic',
        mechanism: 'Primarily reduce dopamine D2 signaling while affecting serotonin and other receptors depending on the medicine.',
        best_for: 'Reducing hallucinations, delusions, agitation, and relapse risk.',
        common_side_effects: ['weight gain', 'metabolic changes', 'sedation', 'movement symptoms']
      },
      {
        name: 'First-generation antipsychotics',
        type: 'Antipsychotic',
        mechanism: 'Strong dopamine D2 receptor blockade that can reduce positive psychotic symptoms.',
        best_for: 'Psychosis treatment when benefits outweigh side-effect risks and monitoring is available.',
        common_side_effects: ['stiffness', 'restlessness', 'tremor', 'sedation']
      },
      {
        name: 'Long-acting injectable antipsychotics',
        type: 'Maintenance antipsychotic',
        mechanism: 'Provide steady medication levels over weeks or months to reduce missed-dose relapse risk.',
        best_for: 'People who prefer fewer doses or have had relapse after missed medication.',
        common_side_effects: ['injection site soreness', 'weight changes', 'sedation', 'movement symptoms']
      }
    ],
    lifestyle_remedies: [
      'Create a relapse prevention plan that lists early warning signs, trusted contacts, preferred care steps, and crisis resources.',
      'Prioritize regular sleep and low-disruption routines because sleep loss can intensify psychotic symptoms.',
      'Avoid cannabis, stimulants, and other substances that can worsen psychosis risk.',
      'Use coordinated specialty care, family psychoeducation, supported education or employment, and skills training when available.',
      'Reduce isolation with structured, low-pressure social contact and practical supports.'
    ],
    prognosis:
      'Outcomes vary widely. Early intervention, consistent follow-up, medication that is tolerable, family or community support, substance avoidance, housing stability, and meaningful roles all improve the chance of recovery and relapse prevention. Some people return to school, work, relationships, and independent living; others benefit from ongoing support. Urgent help is needed when psychosis creates danger, inability to care for basic needs, severe agitation, or suicidal thoughts.',
    prevalence: 'Often estimated at less than 1% of the population worldwide.',
    related_disorders: ['Schizoaffective Disorder', 'Bipolar Disorder', 'Delusional Disorder', 'Substance-Induced Psychosis']
  }
};

const aliases = {
  'major-depressive-disorder': 'major-depression',
  depression: 'major-depression',
  'generalized-anxiety-disorder': 'generalized-anxiety',
  gad: 'generalized-anxiety'
};

function getFallback(disorder) {
  const slugKey = normalizeKey(disorder?.slug);
  const nameKey = normalizeKey(disorder?.name);
  return fallbackBySlug[slugKey] || fallbackBySlug[aliases[slugKey]] || fallbackBySlug[nameKey] || fallbackBySlug[aliases[nameKey]];
}

function isSparseString(field, value) {
  const text = String(value || '').trim();
  if (!text) return true;
  return field === 'overview' && text.length < FALLBACK_TEXT_MIN_LENGTH;
}

function shouldUseFallback(field, value) {
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'string' || value == null) return isSparseString(field, value);
  return false;
}

export function enrichDisorderContent(disorder) {
  const fallback = getFallback(disorder);
  if (!disorder || !fallback) return disorder;

  return Object.entries(fallback).reduce(
    (enriched, [field, fallbackValue]) => {
      if (shouldUseFallback(field, enriched[field])) {
        enriched[field] = fallbackValue;
      }
      return enriched;
    },
    { ...disorder }
  );
}
