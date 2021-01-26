interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'almir@icone3.com.br',
      name: 'Almir | ÍCONE3 Arquitetura',
    },
  },
} as IMailConfig;
