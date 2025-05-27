
export const generatePersonalizedCalendar = (clinicData) => {
  const { clinicName, procedures, city, monthlyRevenue } = clinicData;
  
  // Define awareness funnel stages
  const funnelStages = [
    'Inconsciente',          // Unaware - 20% (6 posts)
    'Consciente do Problema', // Problem-Aware - 25% (7-8 posts)
    'Consciente da Solução', // Solution-Aware - 25% (7-8 posts)
    'Consciente do Produto', // Product-Aware - 20% (6 posts)
    'Totalmente Consciente'  // Most-Aware - 10% (3 posts)
  ];

  // Content templates organized by procedure and funnel stage
  const contentTemplates = {
    'Limpeza e Profilaxia': {
      'Inconsciente': [
        {
          titulo: "Por que algumas pessoas têm hálito mais forte pela manhã?",
          descricao: `Grave um vídeo explicando de forma curiosa como nossa boca funciona durante o sono. Use uma linguagem descontraída e mostre como é normal, mas que pode indicar outras coisas. Termine com: "Você já percebeu isso? Conta aqui nos comentários!"`,
          tipo: "Vídeo (Reels)",
          objetivo: "Inconsciente"
        },
        {
          titulo: "O que a cor da sua língua revela sobre sua saúde",
          descricao: `Carrossel mostrando diferentes colorações da língua e o que podem indicar. Use imagens ilustrativas e linguagem simples. Desperte curiosidade sem assustar. Final: "Observar sua boca pode te dar pistas importantes sobre sua saúde geral!"`,
          tipo: "Carrossel",
          objetivo: "Inconsciente"
        }
      ],
      'Consciente do Problema': [
        {
          titulo: "Sangramento na gengiva: seu corpo está pedindo socorro",
          descricao: `Vídeo mostrando como o sangramento é um sinal de inflamação. Explique as consequências de ignorar esse sintoma: desde mal-hálito até problemas cardíacos. Use um tom acolhedor, não assustador. CTA: "Se isso acontece com você, não ignore. Vamos conversar?"`,
          tipo: "Vídeo explicativo",
          objetivo: "Consciente do Problema"
        }
      ],
      'Consciente da Solução': [
        {
          titulo: "Limpeza profissional: muito além da escovação em casa",
          descricao: `Grave no consultório mostrando a diferença entre limpeza caseira e profissional. Use modelos de dentes para demonstrar onde a escova não alcança. Explique o processo de forma didática. Final: "É isso que uma limpeza profissional faz pelos seus dentes!"`,
          tipo: "Vídeo educativo",
          objetivo: "Consciente da Solução"
        }
      ],
      'Consciente do Produto': [
        {
          titulo: "Como fazemos a limpeza aqui na ${clinicName}",
          descricao: `Vídeo mostrando seu protocolo de limpeza, destacando diferenciais: ultrassom moderno, jato de bicarbonato, fluoretação. Mostre o ambiente acolhedor. Tom: "Aqui você recebe todo esse cuidado especializado."`,
          tipo: "Vídeo institucional",
          objetivo: "Consciente do Produto"
        }
      ],
      'Totalmente Consciente': [
        {
          titulo: "Junho: mês da saúde bucal na ${clinicName}",
          descricao: `Post promocional com condição especial para limpeza. Destaque a urgência e facilite o agendamento. Use call-to-action direto: "Agende sua limpeza ainda hoje pelo WhatsApp. Link na bio!" Inclua preço ou desconto específico.`,
          tipo: "Post promocional",
          objetivo: "Totalmente Consciente"
        }
      ]
    },
    'Clareamento Dental': {
      'Inconsciente': [
        {
          titulo: "Você sabia que existem alimentos que deixam os dentes mais brancos?",
          descricao: `Carrossel revelando alimentos surpreendentes que ajudam na limpeza natural dos dentes: maçã, morango, queijo. Conte curiosidades interessantes. Final: "A natureza é incrível, né? Qual desses você já sabia?"`,
          tipo: "Carrossel",
          objetivo: "Inconsciente"
        },
        {
          titulo: "A história do sorriso: por que valorizamos dentes brancos?",
          descricao: `Vídeo contando a evolução histórica da valorização dos dentes brancos. Use curiosidades e fatos interessantes. Tom storytelling descontraído. Termine com: "Interessante como isso mudou com o tempo, não é?"`,
          tipo: "Vídeo storytelling",
          objetivo: "Inconsciente"
        }
      ],
      'Consciente do Problema': [
        {
          titulo: "Dentes amarelados: quando a autoestima despenca",
          descricao: `Conte a história (sem nomes) de uma paciente que parou de sorrir em fotos por causa dos dentes amarelados. Mostre como isso afetou sua vida social e profissional. Use empatia total. CTA: "Se você se sente assim, saiba que tem solução."`,
          tipo: "Vídeo storytelling",
          objetivo: "Consciente do Problema"
        }
      ],
      'Consciente da Solução': [
        {
          titulo: "Clareamento: como funciona na prática",
          descricao: `Explique o processo de clareamento com linguagem simples. Mostre antes e depois de casos reais (com autorização). Desmistifique mitos sobre sensibilidade. Seja transparente sobre tempo e resultados esperados.`,
          tipo: "Vídeo educativo",
          objetivo: "Consciente da Solução"
        }
      ],
      'Consciente do Produto': [
        {
          titulo: "Nosso protocolo de clareamento: segurança em primeiro lugar",
          descricao: `Mostre como vocês fazem o clareamento na ${clinicName}: avaliação prévia, proteção das gengivas, acompanhamento durante todo processo. Destaque diferenciais técnicos de forma acessível.`,
          tipo: "Vídeo institucional",
          objetivo: "Consciente do Produto"
        }
      ],
      'Totalmente Consciente': [
        {
          titulo: "Transforme seu sorriso ainda este mês!",
          descricao: `Post com forte call-to-action para clareamento. Inclua promoção especial, facilite pagamento, destaque rapidez do resultado. "Clareamento profissional com X% de desconto. Últimas vagas de junho!"`,
          tipo: "Post promocional",
          objetivo: "Totalmente Consciente"
        }
      ]
    },
    'Implantes': {
      'Inconsciente': [
        {
          titulo: "Você conhece alguém que perdeu um dente e nunca mais foi o mesmo?",
          descricao: `Vídeo reflexivo sobre como a perda de dentes afeta as pessoas. Conte de forma humanizada, sem mencionar tratamentos. Foque no impacto emocional e social. Final: "A gente nem percebe o quanto nossos dentes são importantes, né?"`,
          tipo: "Vídeo reflexivo",
          objetivo: "Inconsciente"
        }
      ],
      'Consciente do Problema': [
        {
          titulo: "O que acontece com seu rosto quando você perde um dente",
          descricao: `Explique como a falta de dentes causa envelhecimento precoce, problemas na mastigação e autoestima. Use imagens ilustrativas. Tom educativo mas empático. CTA: "Se você está passando por isso, saiba que não precisa ser para sempre."`,
          tipo: "Vídeo educativo",
          objetivo: "Consciente do Problema"
        }
      ],
      'Consciente da Solução': [
        {
          titulo: "Implante dentário: a solução mais próxima do dente natural",
          descricao: `Explique como o implante funciona, suas vantagens sobre outras próteses. Use analogias simples e linguagem acessível. Desmistifique medos comuns sobre cirurgia e dor.`,
          tipo: "Vídeo educativo",
          objetivo: "Consciente da Solução"
        }
      ],
      'Consciente do Produto': [
        {
          titulo: "Implantodontia na ${clinicName}: tecnologia e cuidado humano",
          descricao: `Mostre seus equipamentos de ponta, certificações, experiência da equipe. Destaque o acompanhamento personalizado que vocês oferecem. Tom: autoridade técnica com calor humano.`,
          tipo: "Vídeo institucional",
          objetivo: "Consciente do Produto"
        }
      ],
      'Totalmente Consciente': [
        {
          titulo: "Avaliação gratuita para implante - só até sexta!",
          descricao: `Oferta limitada para avaliação de implante. CTA direto e urgência. Facilite agendamento e destaque que é sem compromisso. "Agende pelo WhatsApp agora! Link na bio. Vagas limitadas!"`,
          tipo: "Post promocional",
          objetivo: "Totalmente Consciente"
        }
      ]
    },
    'Ortodontia': {
      'Inconsciente': [
        {
          titulo: "Por que algumas pessoas 'mordem a língua' mais que outras?",
          descricao: `Explique de forma curiosa como o posicionamento dos dentes influencia nossa mastigação e fala. Use tom descontraído e científico. Final: "Nosso corpo é uma engenharia perfeita, mas às vezes precisa de alguns ajustes!"`,
          tipo: "Vídeo educativo",
          objetivo: "Inconsciente"
        }
      ],
      'Consciente do Problema': [
        {
          titulo: "Dentes 'tortos': quando isso vai além da estética",
          descricao: `Aborde problemas funcionais dos dentes desalinhados: dificuldade de limpeza, desgaste, dores de cabeça, problemas na ATM. Use linguagem acessível. CTA: "Se você sente alguns desses sintomas, pode estar relacionado!"`,
          tipo: "Vídeo educativo",
          objetivo: "Consciente do Problema"
        }
      ],
      'Consciente da Solução': [
        {
          titulo: "Ortodontia moderna: muito além do 'sorriso metálico'",
          descricao: `Mostre as opções atuais: aparelhos estéticos, transparentes, removíveis. Compare prós e contras de cada um. Desmistifique a ortodontia para adultos.`,
          tipo: "Vídeo comparativo",
          objetivo: "Consciente da Solução"
        }
      ],
      'Consciente do Produto': [
        {
          titulo: "Nossa abordagem ortodôntica: planejamento digital personalizado",
          descricao: `Mostre como vocês fazem o planejamento ortodôntico: escaneamento 3D, simulação digital, acompanhamento. Destaque a precisão e conforto que isso proporciona.`,
          tipo: "Vídeo institucional",
          objetivo: "Consciente do Produto"
        }
      ],
      'Totalmente Consciente': [
        {
          titulo: "Aparelho invisível: condição especial de junho",
          descricao: `Oferta específica para aparelho transparente. Destaque facilidades de pagamento e inclua simulação gratuita. CTA direto: "Quer saber como ficaria seu sorriso? Agenda uma simulação grátis!"`,
          tipo: "Post promocional",
          objetivo: "Totalmente Consciente"
        }
      ]
    },
    'Endodontia': {
      'Inconsciente': [
        {
          titulo: "Aquela dor de dente que vai e volta: você conhece?",
          descricao: `Conte sobre dores intermitentes de forma empática. Não assuste, mas desperte a atenção para sinais que o corpo dá. Final: "Nosso corpo sempre nos avisa quando algo não está bem."`,
          tipo: "Vídeo reflexivo",
          objetivo: "Inconsciente"
        }
      ],
      'Consciente do Problema': [
        {
          titulo: "Quando a dor de dente te acorda de madrugada",
          descricao: `Aborde a dor de dente intensa, como ela afeta o sono, concentração, qualidade de vida. Mostre empatia total. Explique que geralmente indica infecção avançada. CTA: "Se isso está acontecendo, não espere piorar."`,
          tipo: "Vídeo empático",
          objetivo: "Consciente do Problema"
        }
      ],
      'Consciente da Solução': [
        {
          titulo: "Tratamento de canal: salvando dentes condenados",
          descricao: `Explique como o canal salva o dente natural, evitando extração. Desmistifique dor e complexidade. Use analogias simples. Tom: "Seu dente pode ser salvo!"`,
          tipo: "Vídeo educativo",
          objetivo: "Consciente da Solução"
        }
      ],
      'Consciente do Produto': [
        {
          titulo: "Endodontia na ${clinicName}: tecnologia para tratamentos sem dor",
          descricao: `Mostre equipamentos modernos (microscópio, localizadores apicais, instrumentos rotatórios). Destaque como a tecnologia torna o tratamento mais rápido e confortável.`,
          tipo: "Vídeo institucional",
          objetivo: "Consciente do Produto"
        }
      ],
      'Totalmente Consciente': [
        {
          titulo: "Dor de dente não espera! Atendimento de urgência",
          descricao: `Post para casos de urgência. Destaque atendimento rápido e alívio imediato da dor. CTA urgente: "WhatsApp 24h para emergências odontológicas! Link na bio."`,
          tipo: "Post promocional",
          objetivo: "Totalmente Consciente"
        }
      ]
    }
  };

  // Strategic weekly distribution
  const weeklyStrategy = {
    'Segunda': ['Consciente do Problema', 'Consciente da Solução'],
    'Terça': ['Consciente do Produto', 'Inconsciente'],
    'Quarta': ['Consciente da Solução', 'Consciente do Problema'],
    'Quinta': ['Consciente do Produto', 'Totalmente Consciente'],
    'Sexta': ['Totalmente Consciente', 'Consciente da Solução'],
    'Sábado': ['Inconsciente', 'Consciente do Problema'],
    'Domingo': ['Inconsciente', 'Consciente da Solução']
  };

  // Generate 30 days of strategic content
  const calendar = [];
  let dayCount = 0;
  const usedContent = new Set(); // Track used content to avoid repetition
  
  // Funnel distribution targets
  const funnelDistribution = {
    'Inconsciente': 6,
    'Consciente do Problema': 8,
    'Consciente da Solução': 8,
    'Consciente do Produto': 5,
    'Totalmente Consciente': 3
  };
  
  const funnelCounter = { ...funnelDistribution };
  Object.keys(funnelCounter).forEach(key => funnelCounter[key] = 0);

  for (let week = 1; week <= 5; week++) {
    for (let day = 1; day <= 7 && dayCount < 30; day++) {
      dayCount++;
      const date = `${String(dayCount).padStart(2, '0')}/06`;
      const isWeekend = day === 6 || day === 7;
      
      // Get day name for strategy
      const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
      const dayName = dayNames[day === 7 ? 0 : day]; // Adjust for Sunday = 0
      
      // Select funnel stage based on day and remaining distribution
      const possibleStages = weeklyStrategy[dayName] || ['Inconsciente'];
      let selectedStage = possibleStages[0];
      
      // Check if we need to balance the funnel
      for (const stage of possibleStages) {
        if (funnelCounter[stage] < funnelDistribution[stage]) {
          selectedStage = stage;
          break;
        }
      }
      
      // Fallback if all preferred stages are full
      if (funnelCounter[selectedStage] >= funnelDistribution[selectedStage]) {
        for (const [stage, count] of Object.entries(funnelCounter)) {
          if (count < funnelDistribution[stage]) {
            selectedStage = stage;
            break;
          }
        }
      }
      
      // Select procedure and content
      const selectedProcedure = procedures[Math.floor(Math.random() * procedures.length)];
      const procedureContent = contentTemplates[selectedProcedure];
      
      let content;
      if (procedureContent && procedureContent[selectedStage] && procedureContent[selectedStage].length > 0) {
        const availableContent = procedureContent[selectedStage].filter(
          c => !usedContent.has(`${c.titulo}-${selectedProcedure}`)
        );
        
        if (availableContent.length > 0) {
          content = availableContent[Math.floor(Math.random() * availableContent.length)];
          usedContent.add(`${content.titulo}-${selectedProcedure}`);
        } else {
          content = generateFallbackContent(selectedProcedure, selectedStage, clinicName, city);
        }
      } else {
        content = generateFallbackContent(selectedProcedure, selectedStage, clinicName, city);
      }
      
      // Replace placeholders in content
      const finalContent = {
        ...content,
        titulo: content.titulo.replace(/\$\{clinicName\}/g, clinicName),
        descricao: content.descricao.replace(/\$\{clinicName\}/g, clinicName).replace(/\$\{city\}/g, city)
      };
      
      calendar.push({
        id: dayCount,
        dia: date,
        week: week,
        day: day,
        titulo: finalContent.titulo,
        descricao: finalContent.descricao,
        tipo: finalContent.tipo,
        objetivo: finalContent.objetivo,
        procedimento: selectedProcedure,
        isWeekend: isWeekend
      });
      
      funnelCounter[selectedStage]++;
    }
  }
  
  return calendar;
};

const generateFallbackContent = (procedure, stage, clinicName, city) => {
  const fallbackTemplates = {
    'Inconsciente': {
      titulo: `Curiosidade sobre ${procedure.toLowerCase()}: você sabia disso?`,
      descricao: `Compartilhe uma curiosidade interessante sobre ${procedure.toLowerCase()} de forma descontraída. Use storytelling e desperte interesse sem falar de tratamento. Final: "Interessante, né? O que mais vocês gostariam de saber?"`,
      tipo: "Post curiosidade",
      objetivo: "Inconsciente"
    },
    'Consciente do Problema': {
      titulo: `Sinais que você pode precisar de ${procedure.toLowerCase()}`,
      descricao: `Aborde os sintomas e problemas que indicam a necessidade do procedimento. Use linguagem empática e não assustadora. Mostre compreensão pela situação. CTA: "Se você reconhece esses sinais, vamos conversar sem compromisso."`,
      tipo: "Vídeo educativo",
      objetivo: "Consciente do Problema"
    },
    'Consciente da Solução': {
      titulo: `Como ${procedure.toLowerCase()} pode transformar seu sorriso`,
      descricao: `Explique os benefícios e o processo do procedimento de forma didática. Use linguagem simples e seja transparente sobre resultados e tempo. Tom educativo e acolhedor.`,
      tipo: "Vídeo explicativo",
      objetivo: "Consciente da Solução"
    },
    'Consciente do Produto': {
      titulo: `${procedure} na ${clinicName}: nosso diferencial em ${city}`,
      descricao: `Destaque como a ${clinicName} realiza este procedimento: tecnologia, experiência da equipe, acompanhamento personalizado. Posicione autoridade técnica com calor humano.`,
      tipo: "Vídeo institucional",
      objetivo: "Consciente do Produto"
    },
    'Totalmente Consciente': {
      titulo: `${procedure}: condição especial válida só esta semana`,
      descricao: `Oferta específica para o procedimento com call-to-action direto. Destaque urgência, facilite agendamento e inclua benefícios exclusivos. "Agende já pelo WhatsApp! Link na bio."`,
      tipo: "Post promocional",
      objetivo: "Totalmente Consciente"
    }
  };
  
  return fallbackTemplates[stage] || fallbackTemplates['Inconsciente'];
};
