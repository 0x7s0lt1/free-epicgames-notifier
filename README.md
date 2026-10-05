<div align="center">

# Free Epic Games Notifier

Posts the free games from the Epic Games Store to Telegram.

[![Free Games](https://github.com/0x7s0lt1/free-epicgames-notifier/actions/workflows/check-free-games.yaml/badge.svg)](https://github.com/0x7s0lt1/free-epicgames-notifier/actions/workflows/check-free-games.yaml)
[![Telegram Channel](https://img.shields.io/badge/Telegram-@freeEpicGamesAlert-26A5E4?logo=telegram&logoColor=white)](https://t.me/freeEpicGamesAlert)
![GitHub Actions](https://img.shields.io/badge/runs%20on-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)

### 👉 [t.me/freeEpicGamesAlert](https://t.me/freeEpicGamesAlert)

</div>

## Setup

1. Fork the repo.
2. Create a bot with [@BotFather](https://t.me/BotFather) and add it as admin to your channel.
3. In Supabase, create a table `state` with the columns `key` and `value`, then insert a row with `key = lastId`.
4. Add these under **Settings → Secrets and variables → Actions**:

   | Secret | Value |
   | --- | --- |
   | `TELEGRAM_BOT_TOKEN` | Bot token from BotFather |
   | `TELEGRAM_CHANNEL_ID` | Channel id or `@username` |
   | `SUPABASE_URL` | Supabase project URL |
   | `SUPABASE_SECRET_KEY` | Supabase secret key |

5. Run the **check-free-games** workflow once from the Actions tab. After that it runs daily at 13:00 UTC. To change the time, edit the cron in `.github/workflows/check-free-games.yaml`.

## Local run

```bash
cp .env.dist .env   # fill in the values
pnpm install
pnpm start
```
