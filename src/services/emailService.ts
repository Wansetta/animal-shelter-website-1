interface EmailData {
  to: string;
  subject: string;
  html: string;
}

interface PetApplicationData {
  petName: string;
  petId: string;
  userName: string;
  userPhone: string;
  userEmail?: string;
  message?: string;
}

interface FoundPetData {
  userName: string;
  userPhone: string;
  userEmail?: string;
  location: string;
  petType: string;
  petAge?: string;
  description: string;
  additionalInfo?: string;
}

interface GuardianApplicationData {
  petName: string;
  petId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  address: string;
  experience?: string;
  message?: string;
}

class EmailService {
  private readonly targetEmail = "predannost-bsk@mail.ru";

  async sendPetApplication(data: PetApplicationData): Promise<boolean> {
    const emailData: EmailData = {
      to: this.targetEmail,
      subject: `Заявка на питомца: ${data.petName}`,
      html: `
        <h2>Новая заявка на питомца</h2>
        <p><strong>Питомец:</strong> ${data.petName} (ID: ${data.petId})</p>
        <p><strong>Имя заявителя:</strong> ${data.userName}</p>
        <p><strong>Телефон:</strong> ${data.userPhone}</p>
        ${data.userEmail ? `<p><strong>Email:</strong> ${data.userEmail}</p>` : ""}
        ${data.message ? `<p><strong>Сообщение:</strong><br>${data.message}</p>` : ""}
        <p><strong>Дата заявки:</strong> ${new Date().toLocaleString("ru-RU")}</p>
      `,
    };

    return this.sendEmail(emailData);
  }

  async sendFoundPetReport(data: FoundPetData): Promise<boolean> {
    const emailData: EmailData = {
      to: this.targetEmail,
      subject: `Найден питомец: ${data.petType}`,
      html: `
        <h2>Сообщение о найденном питомце</h2>
        <p><strong>Имя сообщившего:</strong> ${data.userName}</p>
        <p><strong>Телефон:</strong> ${data.userPhone}</p>
        ${data.userEmail ? `<p><strong>Email:</strong> ${data.userEmail}</p>` : ""}
        <p><strong>Место находки:</strong> ${data.location}</p>
        <p><strong>Тип животного:</strong> ${data.petType}</p>
        ${data.petAge ? `<p><strong>Возраст:</strong> ${data.petAge}</p>` : ""}
        <p><strong>Описание:</strong><br>${data.description}</p>
        ${data.additionalInfo ? `<p><strong>Дополнительная информация:</strong><br>${data.additionalInfo}</p>` : ""}
        <p><strong>Дата сообщения:</strong> ${new Date().toLocaleString("ru-RU")}</p>
      `,
    };

    return this.sendEmail(emailData);
  }

  async sendGuardianApplication(
    data: GuardianApplicationData,
  ): Promise<boolean> {
    const emailData: EmailData = {
      to: this.targetEmail,
      subject: `Заявка на опекунство: ${data.petName}`,
      html: `
        <h2>Заявка на опекунство</h2>
        <p><strong>Питомец:</strong> ${data.petName} (ID: ${data.petId})</p>
        <p><strong>Имя заявителя:</strong> ${data.userName}</p>
        <p><strong>Телефон:</strong> ${data.userPhone}</p>
        <p><strong>Email:</strong> ${data.userEmail}</p>
        <p><strong>Адрес:</strong> ${data.address}</p>
        ${data.experience ? `<p><strong>Опыт с животными:</strong><br>${data.experience}</p>` : ""}
        ${data.message ? `<p><strong>Дополнительная информация:</strong><br>${data.message}</p>` : ""}
        <p><strong>Дата заявки:</strong> ${new Date().toLocaleString("ru-RU")}</p>
      `,
    };

    return this.sendEmail(emailData);
  }

  private async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      // Создаем mailto ссылку для отправки через email клиент
      const subject = encodeURIComponent(emailData.subject);
      const body = encodeURIComponent(this.htmlToText(emailData.html));
      const mailtoUrl = `mailto:${emailData.to}?subject=${subject}&body=${body}`;

      // Открываем email клиент
      window.open(mailtoUrl, "_blank");

      return true;
    } catch (error) {
      console.error("Ошибка отправки email:", error);
      return false;
    }
  }

  private htmlToText(html: string): string {
    return html
      .replace(/<h2>/g, "\n\n")
      .replace(/<\/h2>/g, "\n")
      .replace(/<p><strong>/g, "\n")
      .replace(/<\/strong>/g, ": ")
      .replace(/<\/p>/g, "")
      .replace(/<br>/g, "\n")
      .replace(/<[^>]*>/g, "")
      .trim();
  }
}

export const emailService = new EmailService();
