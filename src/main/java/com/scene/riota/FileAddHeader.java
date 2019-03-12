
package com.scene.riota;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class FileAddHeader {

    /** ファイルパス毎にファイル内容を保持するMap */
    private static Map<String, List<String>> readRowContents = new HashMap<>();

    public static void main(String[] args) {
        String path = "/users/miyagi/dev/eclipse_work/fgp/heroku/tolling";
        path = "/users/miyagi/dev/eclipse_work/Riota-Utils";
        FileSearch search = new FileSearch();

        // System.out.println("\n●全てのファイルを取得");
        // File[] files = search.listFiles(path, null);
        // printFileList(files);
        // search.clear();

        System.out.println("\n●拡張子javaのファイルを取得");
        File[] files = search.listFiles(path, "*.java");
        printFileList(files);
        search.clear();

        // System.out.println("\n●全てのファイルとディレクトリを取得");
        // files = search.listFiles(path, null, search.TYPE_FILE_OR_DIR, true, 0);
        // printFileList(files);
        // search.clear();

        // System.out.println("\n●現在の日付から、2日前以降に更新されたファイルを取得");
        // files = search.listFiles(path, null, search.TYPE_FILE, true, 2);
        // printFileList(files);
        // search.clear();

        // System.out.println("\n●現在の日付から、30日以前の古いファイルを取得");
        // files = search.listFiles(path, null, search.TYPE_FILE, true, -30);
        // printFileList(files);
        // search.clear();
    }

    /**
     * 取得したファイルに対して同一の処理を実施する
     * 
     * @param files ファイルリスト
     */
    private static void printFileList(File[] files) {
        // ファイル読み込み
        for (int i = 0; i < files.length; i++) {
            File file = files[i];
            System.out.println((i + 1) + ":    " + file);
            readFileContent(file);
        }

        // ファイル書き込み
        for (File file : files) {
            List<String> contents = readRowContents.get(file.getName());
            System.out.println(writeFile(file, contents));
        }
    }

    /**
     * ファイル読み込み処理
     * 
     * <pre>
     * ファイル毎に一行ずつListに記述内容を読み込み
     * ファイル名でMapとして保持する
     * </pre>
     * 
     * @param file ファイル情報
     */
    private static void readFileContent(File file) {

        // ファイル内容リストを設定する
        // 行頭に追加を繰り返す為LinkedListにて定義
        List<String> readRow = new LinkedList<>();
        BufferedReader br = null;
        try {
            br = new BufferedReader(new FileReader(file));
            String str = null;

            // readLine()で１行ずつ読み込んでいく
            while ((str = br.readLine()) != null) {
                readRow.add(str);
            }
            br.close();
            // ファイル名に対してファイル内容リストを設定する
            readRowContents.put(file.getName(), readRow);
        } catch (Exception e) {
            if (br != null)
                try {
                    br.close();
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            e.printStackTrace();
        }
    }

    /**
     * ファイル書き込み処理
     * 
     * <pre>
     * 同一のヘッダーをファイルに書き込む
     * </pre>
     * 
     * @param file     ファイル情報
     * @param contents ファイル内容
     */
    private static String writeFile(File file, List<String> contents) {

        // 追加する文字列を設定
        StringBuilder sb = new StringBuilder();
        sb.append("/*");
        sb.append("\n");
        sb.append(" * ");
        sb.append("Copyright(c) 2019 Fukushima Gas Power Co.,Ltd. All Rights Reserved.");
        sb.append("\n");
        sb.append(" */\n");

        // ファイル書き込み開始
        try {
            if (file.exists() && file.isFile() && file.canWrite()) {
                // ファイル書き込みクラスを生成（追記モードではなく上書きモードで生成）
                PrintWriter pw = new PrintWriter(new BufferedWriter(new FileWriter(file)));

                boolean skipflg = false;
                // 事前に読み込んでおいたソースコードを設定していく
                // 上から順番に検査する
                for (String row : contents) {
                    if (!skipflg && row.contains("package")) {
                        // packageの文言が出てきたらソースコード設定フラグをtrueにする
                        skipflg = true;
                        // ファイルに統一するヘッダー情報を設定
                        pw.println(sb.toString());
                    }
                    // 余分情報と判断して無視する
                    if (skipflg) {
                        // もともと記載のあるソースコードを行ごとに設定する
                        pw.println(row);
                    }
                }

                pw.close();
                return file.getPath() + ":書き込み完了";
            } else {
                return "ファイルに書き込めません";
            }
        } catch (IOException e) {
            e.printStackTrace();
            return e.getMessage();
        }

    }

}
